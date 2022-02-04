import React from "react";
import Card from "../../../../Components/Shared/Card/Card";
import Button  from "../../../../Components/Shared/Button/Button";
import TextBox from "../../../../Components/Shared/TextBox/TextBox";
import styles from "./Phone.module.css";

const Phone = ({ onNext }) => {
    return (
        <Card title="Enter Phone Number">
            <TextBox />
            <div className={styles.button}>
                <Button text="Next" onClick={onNext}/>
            </div>
        </Card>
    );
};

export default Phone;