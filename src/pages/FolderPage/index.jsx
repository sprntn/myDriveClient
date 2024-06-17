import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import { useEffect, useState } from 'react'
//import axios from 'axios'
import FilesList from '../../components/FilesList'
import FoldersList from '../../components/FoldersList'
import fetchService from '../../services/fetchService'
import useDataContext from '../../contexts/DataContext'

function FolderPage(){

    
    const {folders, files, setFolders, setFiles} = useDataContext()
    const {folderPath} = useParams()


    useEffect(() => {
        fetchService.getFolderContent(folderPath).then(res => {
        
            setFolders(res.folders)
            setFiles(res.files)
        })
    },[folderPath])

    return(
        <div className={`${styles.folderPage} page`}>
            
            
            <FoldersList folders={folders} endPoint={folderPath}/>
            <div className={styles.lineWraper}>
                <div className={styles.line}></div>
            </div>
            <FilesList files={files} endPoint={folderPath}/>
        </div>
    )
}

export default FolderPage