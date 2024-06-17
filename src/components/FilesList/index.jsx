import FileBox from '../FileBox'
import styles from './style.module.css'

function FilesList({files, endPoint}){
    
    return(
        <div className={styles.filesList}>
            {files.map((f,i) => <FileBox key={i} endPoint={endPoint} name={f}/>)}
        </div>
    )
}

export default FilesList