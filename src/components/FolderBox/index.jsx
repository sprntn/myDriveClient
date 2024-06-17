import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { FaRegFolderOpen } from "react-icons/fa";

function FolderBox({endPoint, name}){
    return(
        <Link to={`../folder/${endPoint}*${name}`}>
            <div className={styles.folderBox}>
                <div className={styles.empty}></div>
                <div className={styles.icon}>
                    <FaRegFolderOpen />
                </div>
                <div className={styles.folderName}>
                    <p>{name}</p>
                </div>
            </div>
        </Link>
    )
}

export default FolderBox