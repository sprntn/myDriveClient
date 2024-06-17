import { useRef } from 'react'
import styles from './style.module.css'
import { useLocation } from 'react-router-dom'
//import axios from 'axios';
import useDataContext from '../../contexts/DataContext';
import fetchService from '../../services/fetchService';
import { GiCancel } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";

function AddFolder() {

    const { setPopup, setFolders, treeItems, setTreeItems, isRootOpen } = useDataContext()
    const location = useLocation()
    const path = location.pathname.split("/").slice(2)[0] || ""
    const folderNameRef = useRef(null)


    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = folderNameRef.current.value;
        fetchService.addFolder(`${path}*${value}`).then(res => {
            setFolders(res.folders)
            let insertIndex = 0;
            if (path == "") {
                if (isRootOpen) {
                    const resIndex = res.folders.findIndex(f => f == value)
                    let i = 0; 
                    let counter = 0;
                    while (counter < resIndex) {
                        if (treeItems[i].depth === 1 && treeItems[i].isFolder) {
                            counter++;
                        }
                        i++;
                    }
                    insertIndex = i
                    const newTreeItems = treeItems.slice(0, insertIndex)
                        .concat({ depth: 1, name: value, path: "*" + value, isFolder: true, isOpen: false })
                        .concat(treeItems.slice(insertIndex))
                    setTreeItems(newTreeItems)
                }
            }
            else {
                const parentIndex = treeItems.findIndex(i => i.path == path)
                if (treeItems[parentIndex]?.isOpen) {
                    const resIndex = res.folders.findIndex(f => f == value)
                    let i = parentIndex + 1;
                    let counter = 0;
                    const depth = treeItems[parentIndex].depth + 1;
                    while (counter < resIndex) {
                        if (treeItems[i].depth === depth && treeItems[i].isFolder) {
                            counter++;
                        }
                        i++;
                    }
                    insertIndex = i;
                    const newTreeItems = treeItems.slice(0, insertIndex)
                        .concat({ depth: depth, name: value, path: path + "*" + value, isFolder: true, isOpen: false })
                        .concat(treeItems.slice(insertIndex))
                    setTreeItems(newTreeItems)
                }
            }

            setPopup()
        })

        // axios.post(url, { path, folderName: value })
        // .then(res => {
        //     console.log(res)
        //     fetchFolders()
        //     setPopup()
        // })
        // try {
    }
    return (
        <form className={styles.addFolderForm} onSubmit={handleSubmit}>
            <label htmlFor="folderNameInput">Enter folder name:</label>
            <input type="text" id="folderNameInput" ref={folderNameRef} />
            <div className={styles.btns}>
                <button onClick={() => { setPopup() }}><GiCancel /></button>
                <button type="submit"><GiConfirmed /></button>
            </div>
        </form>
    )
}

export default AddFolder