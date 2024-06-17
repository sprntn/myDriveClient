import FolderBox from '../FolderBox'
import styles from './style.module.css'

function FoldersList({folders, endPoint}){
    
    
    return(
            <div className={styles.foldersList}>
                {folders.map((f,i) => <FolderBox key={i} endPoint={endPoint} name={f}/>)}
            </div>
        )
}

export default FoldersList