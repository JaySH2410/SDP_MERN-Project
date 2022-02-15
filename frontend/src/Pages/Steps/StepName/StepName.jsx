import React from "react";
import Card from "../../../Components/Shared/Card/Card";
import Button from "../../../Components/Shared/Button/Button";
import TextBox from "../../../Components/Shared/TextBox/TextBox";

const StepName = ({ onNext }) => {
    return (
        <>
           <div className={styles.cardWrapper}>
                <Card title= "Enter your Name" >
                    <TextBox
                    value={otp}
                    //onChange={(e) => setOtp(e.target.value)}
                    />
                   
                   <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next"/>
                   </div>
                </Card>
            </div>
        </>
    );
}
export default StepName;