import React, { useState } from "react";
import Card from "../../../Components/Shared/Card/Card";
import Button from "../../../Components/Shared/Button/Button";
import { useSelector } from "react-redux";
import styles from "./StepPic.module.css";


const StepPic = ({ onNext }) => {
    
    const { name } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/default.png');
    function submit(){

    }
    
    return (
        <>
           
                <Card title= {`Enter your profile picture ${name}`} >             
                   <div className={styles.picWrapper}>
                        <img className={styles.pic} src={image} alt="display pic"/>
                   </div>
                   <div>
                       <input type="file" className={styles.picInput} id='picInput'/>
                       <label className={styles.picLabel} htmlFor="picInput">
                           Choose a different photo 
                       </label>
                   </div>
                   <div>
                        <Button onClick={submit} text="Next"/>
                   </div>
                </Card>
            
        </>
    );
}
export default StepPic;