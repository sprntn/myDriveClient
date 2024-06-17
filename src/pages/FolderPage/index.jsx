import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import { useEffect, useState } from 'react'
//import axios from 'axios'
import FilesList from '../../components/FilesList'
import FoldersList from '../../components/FoldersList'
import fetchService from '../../services/fetchService'
import useDataContext from '../../contexts/DataContext'

function FolderPage(){

    // const [folders, setFolders] = useState([])
    // const [files, setFiles] = useState([])
    const {folders, files, setFolders, setFiles} = useDataContext()
    const {folderPath} = useParams()
    //const baseUrl = "http://localhost:3000/file/dir-list/"
    //const {folders, files, fetchFolders} = useDataContext()

    useEffect(() => {
        fetchService.getFolderContent(folderPath).then(res => {
            console.log(res)
            setFolders(res.folders)
            setFiles(res.files)
        })
    },[folderPath])

    // useEffect(() => {
    //     fetchFolders()
    // }, [folderPath])
    // useEffect(() => {
    //     //console.log(folderPath)
    //     //const decPath = folderPath.split("*").join("/")
    //     //console.log(decPath)
    //     axios.get(baseUrl + folderPath).then(res => {
    //         console.log(res)
    //         setFolders(res.data.folders)
    //         setFiles(res.data.files)
    //     })
    // }, [folderPath])
    
    return(
        <div className={`${styles.folderPage} page`}>
            {/* <h1>folder page</h1> */}
            
            
            <FoldersList folders={folders} endPoint={folderPath}/>
            <div className={styles.lineWraper}>
                <div className={styles.line}></div>
            </div>
            <FilesList files={files} endPoint={folderPath}/>
        </div>
    )
}

export default FolderPage