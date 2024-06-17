import FileBox from '../FileBox'
import styles from './style.module.css'

function FilesList({files, endPoint}){
    console.log(endPoint);
    return(
        <div className={styles.filesList}>
            {/* <h2>files</h2> */}
            {files.map((f,i) => <FileBox key={i} endPoint={endPoint} name={f}/>)}
        </div>
    )
}

export default FilesList