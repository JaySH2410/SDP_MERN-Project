import React, { useState } from "react";
import Card from "../../../Components/Shared/Card/Card";
import Button from "../../../Components/Shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StepPic.module.css";
import {setAvatar} from "../../../store/activateSlice";
import {setAuth} from "../../../store/authSlice";
import { activate } from "../../../http";


const StepPic = ({ onNext }) => {
    
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/default.png');
    const dispatch = useDispatch();
    

    function saveImage(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result); 
            dispatch(setAvatar(reader.result));
            //console.log(reader.result);
        }
        // console.log(e);
    }

    async function submit(){
        try{
            console.log('check');
            const {data} = await activate({ name, avatar });
            if(data.auth){
                dispatch(setAuth(data));
            }
            //console.log(data);
        }catch(err){
            console.log('check');
            console.log(err);
        }
    }
    
    return (
        <>
           
                <Card title= {`Enter your profile picture ${name}`} >             
                   <div className={styles.picWrapper}>
                        <img className={styles.pic} src={image} alt="display pic"/>
                   </div>
                   <div>
                       <input onChange={saveImage} type="file" className={styles.picInput} id='picInput'/>
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