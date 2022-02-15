import React from "react";
import styles from "./TextBox.module.css";


const TextBox = (props) => {
    return(
        <div>
            <input 
            className={styles.input} 
            type="text"
            {...props}
        />
        </div>
    );
    
};

export default TextBox;