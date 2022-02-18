import React, { useState } from 'react';
import Card from "../../../../Components/Shared/Card/Card";
import Button  from "../../../../Components/Shared/Button/Button";
import TextBox from "../../../../Components/Shared/TextBox/TextBox";
import styles from "../StepPhone.module.css";
import { sendOtp } from '../../../../http/index'; 
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';



const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch =useDispatch();
    
    async function submit() {
        if(!phoneNumber) return;
        const { data } = await sendOtp({ phone: phoneNumber });
        console.log( data );
        dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        onNext();
    }
    
    return (
        
        <Card title="Enter your phone number">
            <TextBox
                value= {phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
            </div>
        </Card>
    );
};

export default Phone;

// <Card title="Enter Phone Number">
        //     <TextBox value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        //     <div>
        //         <div className={styles.actionButtonWrap}>
        //             <Button text="Next" onClick={submit}/>
        //         </div>
        //     </div>
        // </Card>