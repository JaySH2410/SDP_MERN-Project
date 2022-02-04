import React from "react";
import styles from './Home.module.css'
import { Link, useHistory } from "react-router-dom";
import Card from "../../Components/Shared/Card/Card";
import Button from "../../Components/Shared/Button/Button";



const Home = () => {

    const signinLinkStyle = {
        color: "#0077ff",
        fontWeight: "bold",
        textDecoration: "none",
    }

    const history = useHistory();

    function StartRegister() {
        history.push("/Authenticate");
    }

    return(
        <div className={styles.cardWrapper}>
           
            <Card title="Welcome To ">
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sem nibh, pulvinar in sapien quis, pharetra interdum odio. 
                    Proin eget ligula eu lectus laoreet pulvinar tincidunt in sem. Donec ut dictum nisl. Donec condimentum auctor nisi eget sagittis.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo vitae libero quis dapibus.
                </p>
                <div>
                    <Button onClick={StartRegister} text="Go"/>
                </div>
                {/* <div className={styles.signinWrapper}>
                    <Link style={signinLinkStyle} to="/login">Start</Link>
                </div> */}
            </Card>
        </div>
    )
}

export default Home;