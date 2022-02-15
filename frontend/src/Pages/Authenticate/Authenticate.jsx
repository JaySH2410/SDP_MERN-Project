import React, { useState } from "react";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepPhone from "../Steps/StepPhone/StepPhone";

const steps = {
    1: StepPhone,
    2: StepOtp,
};

const Authenticate = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    function onNext(){
        setStep(step + 1);
    }
    return (
        <div>
            <Step onNext={onNext}/>
        </div>
    );
}

export default Authenticate;