import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useSelector} from 'react-redux';
import styles from './Room.module.css';
import { getRoom } from '../../http';


const Room = () => {
    const {id: roomId} = useParams();  
    const user = useSelector((state) => state.auth.user);
    const {clients, provideRef  } = useWebRTC(roomId, user);
    const history = useHistory();
    const [room, setRoom] = useState(null);
    const manualLeave =() => {
        history.push('/rooms');
    }

    useEffect(() => {
        const fetchRoom = async() => {
            const { data } = await getRoom(roomId);
            // console.log(data);
            setRoom((prev) => data);
        };
        fetchRoom();
    }, [roomId]);

    return (
    <div>
    {/* Single Room */}
    <div className="container">
        <button onClick={manualLeave} className={styles.goBack}>
            <img src='/images/arrow-left.png' alt=''/>
            <span>All Voice Rooms</span>
        </button>
    </div>

    <div className={styles.clientsWrap}>
        <div className={styles.header}>
            <h2 className={styles.topic}>
                {room?.topic}
            </h2>
            <div className={styles.actions}>
                <button className={styles.actionBtn}>
                    <img src='/images/palm.png' alt='icon'/>
                </button>
                <button onClick={manualLeave} className={styles.actionBtn}>
                    <img src='/images/win.png' alt='icon'/>
                    <span>
                        Leave Room
                    </span>
                </button>
            </div>
        </div> 
        <div className={styles.clientsList}>
        {
        clients.map(client => {
            return (
                <div className={styles.client} key={client.id}>
                    <div className={styles.userHead}>
                    <img className={styles.userAvatar} src={client.avatar} alt='dp'/>
                    <button className={styles.micBtn}>
                        {/* <img src='/images/mic.png' alt='mic'></img> */}
                        <img src='/images/mic-mute.png' alt='mic mute'></img>
                    </button>
                    <audio 
                        ref={(instance) => provideRef(instance, client.id)} //read abt this 
                    // controls
                        autoPlay></audio>
                    
                    
                    </div>
                    <h4>{client.name}</h4>
                </div>
            );
        })
    }
        </div>

    </div>
    </div>
    );
};

export default Room;

