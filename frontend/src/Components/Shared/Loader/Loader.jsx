import React from "react";
import Card from "../Card/Card";
import styles from "./Loader.module.css";

const Loader = ({message}) => {
    return(
        <div className="cardWrapper">
            <Card >
            {/* <div className={styles.msgWrapper}> */}
                <span className={styles.message}>{message}</span>        
            {/* </div> */}
                
            </Card>
        </div>
    )
}

export default Loader;