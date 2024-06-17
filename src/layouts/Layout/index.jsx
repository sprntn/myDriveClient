
import {  useState } from 'react';
import Content from '../../components/Content'
import MainNav from '../../components/MainNav'
import styles from './style.module.css'
import Popup from '../../components/Popup';

import { DataContext } from '../../contexts/DataContext';

function Layout(){
    
    const [loggedUser, setLoggedUser] = useState(localStorage.getItem('userRoot'))
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    const [popup, setPopup] = useState();
    const [treeItems, setTreeItems] = useState([])
    const [isRootOpen, setIsRootOpen] = useState(false)


    return(
        <>
            <DataContext.Provider value={{folders, setFolders, files, setFiles, popup, setPopup, loggedUser, setLoggedUser, treeItems, setTreeItems, isRootOpen, setIsRootOpen}}>
                <MainNav setPopup={setPopup}/>
                <Content />
                {popup && <Popup setPopup={setPopup} popup={popup}/>}
            </DataContext.Provider>
        </>
    )
}

export default Layout