import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/Navigator.module.css"



function PageNameAndNavigator(){
    const navigate = useNavigate();
    return (
            <section className={styles.newUserHeader} >
                <FontAwesomeIcon className={styles.arrowIcon}
                    icon={faArrowCircleLeft}
                    onClick={() => navigate(-1)}
                    style={{ cursor: 'pointer' }} 
                />
                <h1 className={styles.title}>New user registration</h1>
            </section>
    );
}

export default PageNameAndNavigator;