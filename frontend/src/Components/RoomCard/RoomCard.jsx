import React from "react";
import styles from './RoomCard.module.css';
import { useHistory } from 'react-router-dom';

const RoomCard = ({ room }) => {
const history = useHistory();

    return (
        <div 
            onClick={() => {
                history.push(`/room/${room.id}`); 
            }} 
            className={styles.card}
        > 
            {/* {room.topic} */}
            <h3 className={styles.topic}>
                {room.topic}
            </h3>

            <div className={`${styles.speakers} ${room.speakers.lenght === 1 ? styles.singleSpeaker : ''}`}>
                <div className={styles.avatars}>
                    {room.speakers.map(speaker => (
                        <img key={speaker.id} src={speaker.avatar} alt="speaker-dp"></img>
                    ))}
                </div>

                <div className={styles.names}>
                    {room.speakers.map(speaker => (
                        <div key={speaker.id} className={styles.nameWrapper}>
                            <span>{speaker.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className={styles.people.count}>
                        <span>{room.totalPeople}</span>
            </div> */}
            <div className={styles.peopleCount}>
                <span>{room.totalPeople}</span>
                <img src="/images/user-icon.png" alt="user-icon" />
            </div>
        </div>
    )
}

export default RoomCard;