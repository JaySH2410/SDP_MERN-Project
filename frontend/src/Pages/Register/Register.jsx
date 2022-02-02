import React, { useState } from "react";
import styles from "./Register.module.css";
import StepName from "../Steps/StepName/StepName";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepPhone from "../Steps/StepPhone/StepPhone";
import StepPic from "../Steps/StepPic/StepPic";

const steps = {
    1: StepPhone,
    2: StepOtp,
    3: StepName,
    4: StepPic,
}; 

const Register = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    function onNext(){
        setStep(step+1);
    }
    return (
        <div>
            <Step onNext={onNext}/>
        </div>
    );
}

export default Register;