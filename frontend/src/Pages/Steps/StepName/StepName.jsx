import React, { useState } from "react";
import Card from "../../../Components/Shared/Card/Card";
import Button from "../../../Components/Shared/Button/Button";
import TextBox from "../../../Components/Shared/TextBox/TextBox";
import { useDispatch, useSelector } from "react-redux";
import {setName} from "../../../store/activateSlice";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullName] = useState(name);
    function nextStep(){
        if(!fullname){
            return;
        }   
        dispatch(setName(fullname));
        onNext();
    }
    return (
        <>
           <div className={styles.cardWrapper}>
                <Card title= "Enter your Name" >
                    <TextBox
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    />                   
                   <div>
                        <Button onClick={nextStep} text="Next"/>
                   </div>
                </Card>
            </div>
        </>
    );
}
export default StepName;