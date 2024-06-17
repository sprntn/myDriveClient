import { useEffect, useState } from 'react'
import FilesList from '../../components/FilesList'
import FoldersList from '../../components/FoldersList'
//import RecentList from '../../components/RecentList'
import styles from './style.module.css'
//import axios from 'axios'
import useDataContext from '../../contexts/DataContext'
import fetchService from '../../services/fetchService'


function HomePage() {
    
    // const [folders, setFolders] = useState([])
    // const [files , setFiles] = useState([])

    const {folders, files, setFolders, setFiles} = useDataContext()

    useEffect(() => {
        fetchService.getFolderContent("").then((res) => {
            console.log(res)
            setFolders(res.folders)
            setFiles(res.files)
        })
    }, [])

    // const [files, setFiles] = useState([])
    //const [recent, setRecent] = useState([])

    //const baseUrl = "http://localhost:3000/file/dir-list/testFolder1"
    //const baseUrl = "http://localhost:3000/file/dir-list/"
    //const endPoint = "public"
    //const {folders, files, fetchFolders} = useDataContext()

    // useEffect(() => {
    //     axios.get(baseUrl + endPoint).then(res => {
    //         console.log(res)
    //         setFolders(res.data.folders)
    //         setFiles(res.data.files)
    //     })
    // }, [])
    // useEffect(() => {
    //     fetchFolders()
    // }, [])

    //console.log(folders, files);

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