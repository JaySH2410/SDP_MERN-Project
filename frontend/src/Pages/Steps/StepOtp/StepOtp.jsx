import React, { useState } from "react";
import TextBox from "../../../Components/Shared/TextBox/TextBox";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import styles from "./StepOtp.module.css";


const StepOtp = ({ onNext }) => {
    const [otp,setOtp] = useState('');
    function next(){};
    return (
        <>
            <div className={styles.cardWrapper}>
                <Card title= "Enter the OTP we just sent you" >
                    <TextBox
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                   
                   <div className={styles.actionButtonWrap}>
                        <Button onClick={next} text="Next"/>
                   </div>
                </Card>
            </div>
        </>
    );
}
export default StepOtp;