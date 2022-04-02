import React,{ useState } from "react";
import { Component } from "react/cjs/react.production.min";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepPhone.module.css";

const phoneEmailMap = {
    phone: Phone,
    email: Email
};



const StepPhone = ({ onNext }) => {

    const [type, setType] = useState('phone');
    const Component = phoneEmailMap[type];
    // function onNext() {

    // }
    return(
        
        <>
            <div className={styles.cardWrapper}>
                <div>
                    {/* <div className={styles.buttonWrap}>
                        <button 
                            className={`${styles.tabButton} ${type==='phone'? styles.active:''}`} 
                            onClick={()=> setType('phone')}>
                            <img src="/images/phone.png" alt="phone-icon"/>
                        </button>
                        <button className={`${styles.tabButton} ${type==='email'? styles.active:''}`} onClick={()=> setType('email')}>
                            <img src="/images/email.png" alt="email-icon"/> 
                        </button>
                    </div>    */}
                    <Component onNext={onNext}/>
                </div>
            </div>       
        </>
   );
    
}
export default StepPhone;