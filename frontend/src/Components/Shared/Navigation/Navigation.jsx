import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useSelector } from "react-redux";

const Navigation = () => {
    const logoStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '22px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'flex-end',
    };

    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);
    async function logoutUser(){
        try{
            const { data } = await logout();
            dispatch(setAuth(data));
        }catch(err){
            console.log(err);
        }
        
    }
    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={logoStyle} to='/'>
            <img className={styles.cabin} src="/images/cabin.png"></img>
                <span>PodHut</span>
            </Link>
            {/* {isAuth && <button onClick={logoutUser}>Logout</button>} */}
            {/* <div className={styles.navRight}>
                <h3>
                    {user.name}
                </h3>
                <Link to="/">
                    <img className={styles.avatar} src={user.avatar} width="40" height="40" alt="display picture"></img>
                </Link>
                <button className={styles.logout} onClick={logoutUser}>Logout</button>
            </div> */}
            {isAuth && (<div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar ? user.avatar
                                    : '/images/default.png'
                            }
                            width="40"
                            height="40"
                            alt="DP"
                        />
                    </Link> 
            
                    <button
                        className={styles.logout}
                        onClick={logoutUser}
                    >Logout</button>
                </div>)}

            {/* {isAuth && <button onClick={logoutUser}>Logout</button>} */}

        </nav>
    )
}

export default Navigation;