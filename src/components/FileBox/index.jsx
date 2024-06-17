import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { FaRegImage } from "react-icons/fa6";

function FileBox({endPoint, name}){
    return(
        <Link to={`../file/${endPoint}*${name}`}>
            <div className={styles.fileBox}>
                <div className={styles.empty}></div>
                <div className={styles.icon}>
                    <FaRegImage />
                </div>
                <div className={styles.fileName}>
                    <p>{name}</p>
                </div>
            </div>
        </Link>
    )
}

export default FileBox
