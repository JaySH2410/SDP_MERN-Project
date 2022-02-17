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
    const { isAuth } = useSelector((state) => state.auth)
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
            {isAuth && <button onClick={logoutUser}>Logout</button>}
            {/* <div className={styles.navRight}>
                <h3>
                    {user.name}
                </h3>
            </div> */}
            {/* {isAuth && <button onClick={logoutUser}>Logout</button>} */}

        </nav>
    )
}

export default Navigation;