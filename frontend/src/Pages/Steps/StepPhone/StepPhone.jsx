import React from "react";
import { Component } from "react/cjs/react.production.min";
import Phone from "./Phone/Phone";
import styles from "./StepPhone.module.css";

const StepPhone = ({ onNext }) => {
   // <>
        //     <div>
        //         Phone Component
        //     </div>
        //     <button onClick={onNext}>Next</button>
        // </>
    return(
        <>
            <div className={styles.cardWrapper}>
                <Phone onNext={onNext}/>
            </div>

            
        </>
   );
    
}
export default StepPhone;