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
    console.log("location", location);
    const path = location.pathname.split("/").slice(2)[0] || ""
    console.log("path:", path)

    const folderNameRef = useRef(null)


    const handleSubmit = async (event) => {
        event.preventDefault();
        const value = folderNameRef.current.value;
        fetchService.addFolder(`${path}*${value}`).then(res => {
            console.log(res)
            //setFiles(res.files)
            setFolders(res.folders)

            let insertIndex = 0;
            if (path == "") {
                if (isRootOpen) {
                    console.log("the parent folder is open")
                    //find the index in folders result
                    const resIndex = res.folders.findIndex(f => f == value)
                    console.log("the new folder in res index: ", resIndex)
                    let i = 0; //home is out of the items tree array
                    let counter = 0;
                    console.log(treeItems)
                    while (counter < resIndex) {
                        if (treeItems[i].depth === 1 && treeItems[i].isFolder) {//the depth of root children is 1
                            counter++;
                        }
                        i++;
                    }
                    insertIndex = i
                    //inser to items tree array
                    const newTreeItems = treeItems.slice(0, insertIndex)
                        .concat({ depth: 1, name: value, path: "*" + value, isFolder: true, isOpen: false })
                        .concat(treeItems.slice(insertIndex))
                    console.log(newTreeItems)
                    setTreeItems(newTreeItems)
                }
            }
            else {
                console.log("in the middle")
                //add in the middle of the root
                //1 -> find the parent
                const parentIndex = treeItems.findIndex(i => i.path == path)
                if (treeItems[parentIndex]?.isOpen) {
                    console.log("the parent folder is open")
                    const resIndex = res.folders.findIndex(f => f == value)
                    console.log("the new folder in res index: ", resIndex)
                    //find the index to insert
                    let i = parentIndex + 1;
                    let counter = 0;
                    const depth = treeItems[parentIndex].depth + 1;
                    //while(i < treeItems.length && counter < resIndex){
                    while (counter < resIndex) {
                        console.log(treeItems[i])
                        if (treeItems[i].depth === depth && treeItems[i].isFolder) {
                            counter++;
                        }
                        i++;
                    }
                    insertIndex = i;
                    console.log("insert to index", insertIndex)
                    const newTreeItems = treeItems.slice(0, insertIndex)
                        .concat({ depth: depth, name: value, path: path + "*" + value, isFolder: true, isOpen: false })
                        .concat(treeItems.slice(insertIndex))
                    console.log(newTreeItems)
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