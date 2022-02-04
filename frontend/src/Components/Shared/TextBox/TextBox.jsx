import React from "react";
import styles from "./TextBox.module.css";


const TextBox = () => {
    return(
        <div>
            <input className={styles.input} type="text"/>
        </div>
    );
    
};

export default TextBox;