import React, { useState } from "react";
import TextBox from "../Shared/TextBox/TextBox";
import styles from './PrivateModal.module.css';
import { useHistory } from 'react-router-dom';

const PrivateModal = ({onClose}) => {
    const history = useHistory();
    const [link, setLink] = useState('');

    function join() {
        try{
            if(!link) return;

            history.push(`/room/${link}`);

        }catch(err){
            console.log(err);
        }
    }
    
    return (
        <div className={styles.modalMask}> 
            <div className={styles.modalBody}>
                <button onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close"/>
                </button>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>Enter Private Invitation Link</h3>
                    <TextBox fullwidth='true' value={link} onChange={(e) => setLink(e.target.value)}/>
                </div>
                <div onClick={join} className={styles.modalFooter}>
                    <button className={styles.footerButton}>
                    <span>Join</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PrivateModal;