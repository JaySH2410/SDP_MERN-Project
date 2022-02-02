import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
const Navigation = () => {
    const logoStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '22px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'flex-end',
    };
    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={logoStyle} to='/'>
            <img className={styles.cabin} src="/images/cabin.png"></img>
                <span>PodHut</span>
            </Link>

        </nav>
    )
}

export default Navigation;