import React from "react";
import styles from "./Rooms.module.css";
import RoomCard from '../../Components/RoomCard/RoomCard';

const rooms = [
    {
        id: 1,
        topic: 'Why you need to learn ReactJS?',
        speakers: [
            {
                id: 1,
                name: 'Omik',
                avatar: '/images/default.png',
            },
            {
                id: 2,
                name: 'Jay',
                avatar: '/images/default.png',
            },
        ],
        totalPeople: 60,
    },
    {
        id: 2,
        topic: 'How to use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'Deep',
                avatar: '/images/default.png',
            },
            {
                id: 2,
                name: 'Vishnu',
                avatar: '/images/default.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'Why python is so trending?',
        speakers: [
            {
                id: 1,
                name: 'Sahil',
                avatar: '/images/default.png',
            },
            {
                id: 2,
                name: 'Roshan',
                avatar: '/images/default.png',
            },
        ],
        totalPeople: 50,
    },
]

const Rooms = () => {
    return <>
        <div className="container">
            <div className={styles.roomsHeader}>
                <div className={styles.left}>
                    <span className={styles.heading}>All voice rooms</span>
                    <div className={styles.searchBox}>
                        <img src="/images/search-icon.png" alt="search"></img>
                        <input type="text" className={styles.searchInput}/>
                    </div>
                </div>
                <div className={styles.right}>
                    <button className={styles.startRoomButton}>
                        <img src="/images/add-room-icon.png" alt="add-room"></img>
                        <span> Start New Room</span>
                    </button>
                </div>
            </div>
            <div className={styles.roomList}>
                {rooms.map((room) => (
               <>
               <RoomCard key={room.id} room={room}/>
                {/* <RoomCard key={room.id} room={room}/>
                <RoomCard key={room.id} room={room}/>
                <RoomCard key={room.id} room={room}/> */}
               </>
                ))}
            </div>
        </div>
    </>
};

export default Rooms;