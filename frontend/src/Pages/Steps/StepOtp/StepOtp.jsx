import React, { useState } from "react";
import TextBox from "../../../Components/Shared/TextBox/TextBox";
import Button from "../../../Components/Shared/Button/Button";
import Card from "../../../Components/Shared/Card/Card";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";


const StepOtp = ({ onNext }) => {
    const [otp,setOtp] = useState('');
    const dispatch = useDispatch();
    const { phone, hash } = useSelector((state) => state.auth.otp);
    async function submit(){
        try{
            const { data } = await verifyOtp({ otp, phone, hash});
            console.log(data);
            dispatch(setAuth(data));
            // onNext(); // not needed cause state is reactive
        } catch(err){
            console.log(err);
        }
        
    };
    return (
        <>
            <div className={styles.cardWrapper}>
                <Card title= "Enter the OTP we just sent you" >
                    <TextBox
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                   
                   <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next"/>
                   </div>
                </Card>
            </div>
        </>
    );
}
export default StepOtp;