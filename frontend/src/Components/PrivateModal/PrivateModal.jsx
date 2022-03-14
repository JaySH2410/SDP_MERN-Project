import React from "react";
import TextBox from "../Shared/TextBox/TextBox";
import styles from './PrivateModal.module.css';

const PrivateModal = () => {
    return (
        <div className={styles.modalMask}> 
            <div className={styles.modalBody}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.heading}>Enter Private Invitation Link</h3>
                    <TextBox fullwidth='true'/>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.footerButton}>
                    <span>Join</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PrivateModal;