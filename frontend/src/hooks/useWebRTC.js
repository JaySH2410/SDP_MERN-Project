import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import {socketInit} from "../socket";
import { ACTIONS } from "../actions";

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
    const connection = useRef({});
    const localMediaStream = useRef(null);

    const socket = useRef(null);
    useEffect(() => {
        socket.current = socketInit();
    },[])

    const addNewClients = useCallback(
        (newClient, cb) => {
            const lookingFor = clients.find((client) => client.id === newClient.id);

            if(lookingFor === undefined){
                setClients(
                    (existingClients) => [...existingClients, newClient],
                    cb
                    )
            }
        },
        [clients, setClients],
    )

    //capture mic
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio:true
            });
        };
        startCapture().then(() => {
            addNewClients(user, () => {
                const localElement = audioElements.current[user.id];
                if(localElement){
                    localElement.volume = 0;
                    localElement.srcObject = localMediaStream.current;
                }

                //socket send "join socket"
                socket.current.emit(ACTIONS.JOIN, {roomId, user});

            })
        })
    }, []);

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    return { clients, provideRef };
}