import { useEffect } from 'react'
import FilesList from '../../components/FilesList'
import FoldersList from '../../components/FoldersList'
import styles from './style.module.css'
import useDataContext from '../../contexts/DataContext'
import fetchService from '../../services/fetchService'


function HomePage() {
    
    const {folders, files, setFolders, setFiles} = useDataContext()

    useEffect(() => {
        fetchService.getFolderContent("").then((res) => {
            
            setFolders(res.folders)
            setFiles(res.files)
        })
    }, [])

    return (
        <div className={`${styles.homePage} page`}>
            <FoldersList folders={folders} endPoint={""} />
            <div className={styles.lineWraper}>
                <div className={styles.line}></div>
            </div>
            <FilesList files={files} endPoint={""} />
        </div>
    )
}

export default HomePage