import {useRef}  from "react";
import styles from "../styles/new-user.module.css";


function Submit(){
    const inputRef = useRef();
    return(
        <button className={`${styles.btnSubmit} btn-primary`} type="submit" ref={inputRef}>
            Submit
          </button>
    )

}

export default Submit;