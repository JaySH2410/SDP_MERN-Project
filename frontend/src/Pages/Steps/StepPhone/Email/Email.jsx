import React,{useState}from "react";
import Card from "../../../../Components/Shared/Card/Card";
import Button  from "../../../../Components/Shared/Button/Button";
import TextBox from "../../../../Components/Shared/TextBox/TextBox";
import styles from "../StepPhone.module.css";
import { sendOtp } from "../../../../http/index"; 

const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    async function submit(){
        const res = await sendOtp();
        console.log(res);
        // onNext();
    }
    
    return (
        <Card title="Enter Email">
            <TextBox value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div className={styles.actionButtonWrap}>
                <Button text="Next" onClick={submit}/>
            </div>
        </Card>
    );
};

export default Email;