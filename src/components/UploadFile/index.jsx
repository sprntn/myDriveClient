import axios from 'axios';
import styles from './style.module.css'
import fetchService from '../../services/fetchService';
import useDataContext from '../../contexts/DataContext';
import { useLocation } from 'react-router-dom';
import { GiCancel } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";

function UploadFile(){
     const url = "http://localhost:3000/file/upload-file/"

    const { setPopup, setFolders, setFiles, treeItems, setTreeItems, isRootOpen} = useDataContext()
    const location = useLocation()
    console.log("location",location);
    //const path = location.pathname.split("/").slice(2)[0] 
    const path = location.pathname.split("/").slice(2)[0] || "*"
    console.log(path)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        //console.log(formData);
        //console.log(formData.getAll("newFile"))
        const file = formData.get("newFile")
        console.log("file:", file)
        console.log("file name: ", file.name);
        
        fetchService.uploadFile(path, formData).then(res => {
            console.log(res)
            setFiles(res.files)
            setPopup()

            //update the tree
            //let insertIndex = 0;
            if(path == "*"){
                console.log("in root")
                if(isRootOpen){
                    //find the index in folders result
                    const resIndex = res.files.findIndex(f => f == file)
                    console.log("the new file in res index: ", resIndex)
                    let i = 0; //home is out of the items tree array
                    //find the first file
                    while(i < treeItems.length && treeItems[i].isFolder){
                        i++
                    }
                    i += resIndex;
                    // let counter = 0;
                    // while(counter < resIndex){
                    //     if(!treeItems[i].isFolder && treeItems[i].depth === 1){//the depth of root children is 1
                    //         counter++;
                    //     }
                    //     i++;
                    // }
                    const newTreeItems = treeItems.slice(0, i)
                        .concat({depth: 1, name : file.name, path: "*" + file.name, isFolder: false})
                        .concat(treeItems.slice(i))
                    console.log(newTreeItems)
                    setTreeItems(newTreeItems)
                }
            }
            else{
                console.log("in the middle")
                //add in the middle of the root
                //1 -> find the parent
                const parentIndex = treeItems.findIndex(i => i.path == path)
                if(treeItems[parentIndex].isOpen){
                    console.log("the parent folder is open")
                    //find the index in folders result
                    const resIndex = res.files.findIndex(f => f == file)
                    const depth = treeItems[parentIndex].depth + 1;
                    console.log("the new folder in res index: ", resIndex)
                    //find the index to insert
                    let i = parentIndex + 1;
                    //find the first file
                    while(i < treeItems.length && treeItems[i].isFolder){
                        i++
                    }
                    i += resIndex;
                    const newTreeItems = treeItems.slice(0, i)
                    .concat({depth: depth, name : file.name, path: path + "*" + file.name, isFolder: false})
                    .concat(treeItems.slice(insertIndex))
                    console.log(newTreeItems)
                    setTreeItems(newTreeItems)
                }
            }
        })


        // axios.post(url + path, formData, {headers: {
        //     "Content-Type": "multipart/form-data",
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        // }}).then(res => {
        //     console.log(res)
        //     setFiles(res.data.files)
        //     setFolders(res.data.folders)
        //     setPopup()
        // })
    }
    return(
        <form className={styles.uploadFileForm} onSubmit={handleSubmit}>
            <label htmlFor="fileInput">Choose a file</label>
            {/* <input type="file" id="fileInput" ref={folderNameRef} /> */}
            <input type="file" id="fileInput" name='newFile'/>
            <button type="submit">Submit</button>
            {/* <div className={styles.btns}>
                <button type='submit' ><GiCancel /></button>
                <button onClick={() => {setPopup()}}><GiConfirmed /></button>
            </div> */}
        </form>
    )
}

export default UploadFile