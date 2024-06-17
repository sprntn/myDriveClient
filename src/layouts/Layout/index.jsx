
import { useEffect, useState } from 'react';
import Content from '../../components/Content'
import MainNav from '../../components/MainNav'
import styles from './style.module.css'
import Popup from '../../components/Popup';
//import { useLocation, useParams } from 'react-router-dom';
//import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import fetchService from '../../services/fetchService';

function Layout(){
    //const [isLogged, setIsLogged] = useState(true)
    //const [isLogged, setIsLogged] = useState(localStorage.getItem('token') != undefined)
    const [loggedUser, setLoggedUser] = useState(localStorage.getItem('userRoot'))//if empty is undefined
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    const [popup, setPopup] = useState();
    const [treeItems, setTreeItems] = useState([])
    const [isRootOpen, setIsRootOpen] = useState(false)


    //const location = useLocation()

    // useEffect(() => {
    //     fetchService.getFolderContent()
    // },[])

    // useEffect(() => {
    //     console.log(location.pathname)        
    // },[location])





    //const baseUrl = "http://localhost:3000/file/"

    /*
    const fetchFolders = () => {
        const folderPath = location.pathname == "/" ? "public*" : location.pathname.split("/").slice(2)[0]
        const test = location.pathname.split("/").slice(2)[0]
        // const folderPath = location.pathname//.split("/").slice(2)[0]
        //const folderPath = location.pathname.split("/").slice(1)[0]
        console.log(folderPath);
        //const baseUrl = "http://localhost:3000/file/dir-list/"
        console.log(`fetching from ${baseUrl}dir-list/${folderPath}`)

        // axios.get(baseUrl + "dir-list/" + folderPath)
        // .then(res => {
        //     setFolders(res.data.folders)
        //     setFiles(res.data.files)
        // })
    }
    */

    //check if is user logged in
    //useEffect(fetchFolders, [])

    /*

    const location = useLocation()
    console.log("location",location);
    const path = location.pathname.split("/").slice(2)[0]
    console.log(path)
const {folderPath} = useParams()
    const baseUrl = "http://localhost:3000/file/dir-list/"



    useEffect(() => {
        //console.log(folderPath)
        //const decPath = folderPath.split("*").join("/")
        //console.log(decPath)
        axios.get(baseUrl + folderPath).then(res => {
            console.log(res)
            setFolders(res.data.folders)
            setFiles(res.data.files)
        })
    }, [folderPath])


    */

    return(
        <>
            {/* <DataContext.Provider value={{folders, files, fetchFolders, popup, setPopup, isLogged, setIsLogged}}> 
            <DataContext.Provider value={{folders, setFolders, files, setFiles, popup, setPopup, isLogged, setIsLogged}}>*/}
            <DataContext.Provider value={{folders, setFolders, files, setFiles, popup, setPopup, loggedUser, setLoggedUser, treeItems, setTreeItems, isRootOpen, setIsRootOpen}}>
                <MainNav setPopup={setPopup}/>
                <Content />
                {popup && <Popup setPopup={setPopup} popup={popup}/>}
            </DataContext.Provider>
            {/* <DataContext.Provider value={{ }}></DataContext.Provider> */}
                
            {/* </DataContext.Provider> */}
        </>
    )
}

export default Layout