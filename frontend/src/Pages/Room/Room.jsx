import React, {useState} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useSelector} from 'react-redux'

const Room = () => {
    const {id: roomId} = useParams();  
    const user = useSelector((state) => state.auth.user);
    const {clients, provideRef} = useWebRTC(roomId, user);

    return <div>
    Single Room
    {
        clients.map(client => {
            return (
            <div key={client.id}>
                <audio 
                    ref={(instance) => provideRef(instance, client.id)} //read abt this 
                    controls
                    autoPlay></audio>
                <h4>{client.name}</h4>
            </div>
            );
        })
    }
    </div>;
};

export default Room;

