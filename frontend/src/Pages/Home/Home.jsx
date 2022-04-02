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
           
            <Card title="Welcome To PodHut">
                <p className={styles.text}>
                    PodHut is a podacast application, where people can interact with each other and can talk about; be it sports, politics or academics.
                    <br></br>
                    Not able find topic you want to discuss, feel free to create your own Room and start conversation.
                    <br></br>
                    Like to host a private session where only invited people can join, than start a "Close Room"
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