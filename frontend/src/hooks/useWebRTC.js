import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import {socketInit} from "../socket";
import { ACTIONS } from "../actions";
import { connections } from "mongoose";
import freeice from 'freeice';

// const users = [
//     {
//         id: 1,
//         name: 'Jay',
//     },
//     {
//         id: 2,
//         name: 'Parth',
//     },
// ];

export const useWebRTC = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback([])
    const audioElements = useRef({}); //read abt this
    const connections = useRef({});
    const localMediaStream = useRef(null);

    const socket = useRef(null);
    useEffect(() => {
        socket.current = socketInit();
    },[])

//#NEW1
    const addNewClient = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find(
                (client) => client.id === newClient.id
            );
    
            if (lookingFor === undefined) {
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                );
            }
        },
        [clients, setClients]
    );
    
    
    
//################################################################################################
//#NEW2
    //capture mic
    useEffect(() => {
        console.log('render startCapture', 4);
        const startCapture = async () => {
            // Start capturing local audio stream.
            localMediaStream.current =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
        };

        startCapture().then(() => {
            // add user to clients list
            console.log('render startCapture then', 5);
            addNewClient({ ...user, muted: true }, () => {
                console.log('render add new client me', 6);
                const localElement = audioElements.current[user.id];
                if (localElement) {
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }
            });
            console.log('render before ACTIONS.JOIN', 7);

            // Emit the action to join
            socket.current.emit(ACTIONS.JOIN, {
                roomId,
                user,
            });
        });

        // Leaving the room
        return () => {
            localMediaStream.current
                .getTracks()
                .forEach((track) => track.stop());
            socket.current.emit(ACTIONS.LEAVE, { roomId });
        };
    }, []); 
  

//################################################################################################
//#NEW3  
    //new peer
    useEffect(() => {
        console.log('render handle new peer useEffect', 8);
        const handleNewPeer = async ({
            peerId,
            createOffer,
            user: remoteUser,
        }) => {
            // If already connected then prevent connecting again
            console.log('render inside handle new peer', 8);
            if(peerId in connections.current) {
                return console.warn(
                    `You are already connected with ${peerId} (${user.name})`
                );
            }

            // Store it to connections
            connections.current[peerId] = new RTCPeerConnection({
                iceServers: freeice(),
            });

            // Handle new ice candidate on this peer connection
            connections.current[peerId].onicecandidate = (event) => {
                socket.current.emit(ACTIONS.RELAY_ICE, {
                    peerId,
                    icecandidate: event.candidate,
                });
            };

            // Handle on track event on this connection
            connections.current[peerId].ontrack = ({
                streams: [remoteStream],
            }) => {
                addNewClient({ ...remoteUser, muted: true }, () => {
                    console.log('render add new client remote', 9);
                    if (audioElements.current[remoteUser.id]) {
                        audioElements.current[remoteUser.id].srcObject =
                            remoteStream;
                    } else {
                        let settled = false;
                        const interval = setInterval(() => {
                            if (audioElements.current[remoteUser.id]) {
                                audioElements.current[remoteUser.id].srcObject =
                                    remoteStream;
                                settled = true;
                            }

                            if (settled) {
                                clearInterval(interval);
                            }
                        }, 300);
                    }
                });
            };

            // Add connection to peer connections track
            localMediaStream.current.getTracks().forEach((track) => {
                connections.current[peerId].addTrack(
                    track,
                    localMediaStream.current
                );
            });

            // Create an offer if required
            if (createOffer) {
                const offer = await connections.current[peerId].createOffer();

                // Set as local description
                await connections.current[peerId].setLocalDescription(offer);

                // send offer to the server
                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: offer,
                });
            }
        };

        // Listen for add peer event from ws
        socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
        return () => {
            socket.current.off(ACTIONS.ADD_PEER);
        };
    }, []);
//################################################################################################
//#NEW4
      // Handle ice candidate
      useEffect(() => {
        console.log('render handle ice candidate out', 10);
        socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
            if (icecandidate) {
                connections.current[peerId].addIceCandidate(icecandidate);
            }
        });

        return () => {
            socket.current.off(ACTIONS.ICE_CANDIDATE);
        };
    }, []);

    // Handle session description

    useEffect(() => {
        console.log('render set remote media', 11);
        const setRemoteMedia = async ({
            peerId,
            sessionDescription: remoteSessionDescription,
        }) => {
            connections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteSessionDescription)
            );

            // If session descrition is offer then create an answer
            if (remoteSessionDescription.type === 'offer') {
                const connection = connections.current[peerId];

                const answer = await connection.createAnswer();
                connection.setLocalDescription(answer);

                socket.current.emit(ACTIONS.RELAY_SDP, {
                    peerId,
                    sessionDescription: answer,
                });
            }
        };

        socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
        return () => {
            socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        };
    }, []);
//################################################################################################
//#NEW5
    // //handle remove peer4
    useEffect(() => {
        console.log('render handle remove peer out', 12);
        const handleRemovePeer = ({ peerId, userId }) => {
            console.log('render inside handle remove peer out', 13);
            // Correction: peerID to peerId
            if (connections.current[peerId]) {
                connections.current[peerId].close();
            }

            delete connections.current[peerId];
            delete audioElements.current[peerId];
            setClients((list) => list.filter((c) => c.id !== userId));
        };

        socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            for (let peerId in connections.current) {
                connections.current[peerId].close();
                delete connections.current[peerId];
                delete audioElements.current[peerId];
                console.log('removing', connections.current);
            }
            socket.current.off(ACTIONS.REMOVE_PEER);
        };
    }, []);




    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    return { clients, provideRef };
}


/*

//#OLD1
    // const addNewClient = useCallback(
    //     (newClient, cb) => {
    //         const lookingFor = clients.find((client) => client.id === newClient.id);

    //         if(lookingFor === undefined){
    //             setClients(
    //                 (existingClients) => [...existingClients, newClient],
    //                 cb
    //                 )
    //         }
    //     },
    //     [clients, setClients],
    // )
    

//#OLD2
    // useEffect(() => {
    //     const startCapture = async () => {
    //         localMediaStream.current = await navigator.mediaDevices.getUserMedia({
    //             audio:true
    //         });
    //     };
    //     startCapture().then(() => {
    //         addNewClient(user, () => {
    //             const localElement = audioElements.current[user.id];
    //             if(localElement){
    //                 localElement.volume = 0;
    //                 localElement.srcObject = localMediaStream.current;
    //             }

    //             //socket send "join socket"
    //             socket.current.emit(ACTIONS.JOIN, {roomId, user});

    //         });
    //     });
    //     return () => {
    //         //Leaving room
    //         localMediaStream.current.getTracks()
    //             .forEach(track => track.stop());

    //         socket.current.emit(ACTIONS.LEAVE, {roomId});
    //     };
    // }, []);

    
//#OLD3
//{
    // useEffect(() => {

    //     const handleNewPeer = async ({peerId, createOffer, user: remoteUser}) =>{
    //         //if already connectedd - give warning
    //         if (peerId in connections.current) {
    //             return console.warn(
    //                 `You are already connected with ${peerId} (${user.name})`
    //             );
    //         }
    //         // if(peerId in connections.current){
    //         //     //socketId: connection
    //         //     return console.warn(`Already connected + ${peerId} (${user.name})`);
    //         // }

    //         connections.current[peerId] = new RTCPeerConnection({
    //             iceServers: freeice()//gives public id so we can send
    //         });

    //         //handling new ice candidate
    //         connections.current[peerId].onicecandidate = (event) => {
    //             socket.current.emit(ACTIONS.RELAY_ICE, {
    //                 peerId,
    //                 icecandidate: event.candidate
    //             });
    //         }

    //         //handle when disconnect
    //         connections.current[peerId].ontrack = ({
    //             streams: [remoteStream]
    //         }) => {
    //             addNewClient(remoteUser, () => {
    //                 if(audioElements.current[remoteUser.id]){
    //                     audioElements.current[remoteUser.id].srcObject = remoteStream
    //                 }
    //                 else{
    //                     let settled = false;
    //                     const interval = setInterval(() => {
    //                         if(audioElements.current[remoteUser.id]){
    //                             audioElements.current[remoteUser.id].srcObject = remoteStream
    //                             settled = true;
    //                         }
    //                         if(settled){
    //                             clearInterval(interval);
    //                         }
    //                     },1000)
    //                 }
    //             });
    //         };

    //         //add local track to connection - to send our voice to other person
    //         localMediaStream.current.getTrack().forEach(track => {
    //             connections.current[peerId].addTrack(track, localMediaStream.current);
    //         });

    //         //create offer
    //         if(createOffer){
    //             const offer = await connections.current[peerId].createOffer();

    //             await  connections.current[peerId].setLocalDescription(offer);
    //             //send offer to other person                
    //             socket.current.emit(ACTIONS.RELAY_SDP, {
    //                 peerId,
    //                 sessionDescription: offer
    //             })
    //         }



    //     };

    //     socket.current.on(ACTIONS.ADD_PEER, handleNewPeer)
        
    //     return () => {
    //         socket.current.off(ACTIONS.ADD_PEER);
    //     }
    // }, []);


//#OLD4   
    // //handle ice candidate
    // useEffect(() => {
    //     socket.current.on(ACTIONS.ICE_CANDIDATE, ({peerId, icecandidate}) => {
    //         if(icecandidate){
    //             connections.current[peerId].addIceCandidate(icecandidate);
    //         }
    //     });

    //     return () => {
    //         socket.current.off(ACTIONS.ICE_CANDIDATE);
    //     };
    // }, []);

    // //handle Sdp
    // useEffect(() => {
    //     const handleRemoteSdp = async ({
    //         peerId,
    //         sessionDescription: remoteSessionDescription,
    //     }) => {
    //         connections.current[peerId].setRemoteDescription(
    //             new RTCSessionDescription(remoteSessionDescription)
    //         )

    //         //if session description is type of offer then create am answer 
    //         if(remoteSessionDescription.type === 'offer'){
    //             const connection = connections.current[peerId];
    //             const answer = await connection.createAnswer();

    //             connection.setLocalDescription(answer);

    //             socket.current.emit(ACTIONS.RELAY_SDP, {
    //                 peerId,
    //                 sessionDescription: answer,
    //             });
    //         }


    //     };
    //     socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp)
    //     return () => {
    //         socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    //     }
    // }, []);

    //#OLD5
    // useEffect(() => {
    //     const handleRemovePeer = async ({peerId, userId}) => {
    //         if(connections.current[peerId]) {
    //             connections.current[peerId].close();
    //         }

    //         delete connections.current[peerId];
    //         delete audioElements.current[peerId];
    //         setClients(list => list.filter(client => client.id !== userId));
    //     };
    //     socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    //     return () => {
    //         socket.current.off(ACTIONS.REMOVE_PEER);
    //     }
    // }, []);



*/