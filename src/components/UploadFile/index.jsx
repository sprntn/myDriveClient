import axios from 'axios';
import styles from './style.module.css'
import fetchService from '../../services/fetchService';
import useDataContext from '../../contexts/DataContext';
import { useLocation } from 'react-router-dom';


function UploadFile(){
     const url = "http://localhost:3000/file/upload-file/"

    const { setPopup, setFolders, setFiles, treeItems, setTreeItems, isRootOpen} = useDataContext()
    const location = useLocation()
    const path = location.pathname.split("/").slice(2)[0] || "*"

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target)
        const file = formData.get("newFile")
        
        fetchService.uploadFile(path, formData).then(res => {
            
            setFiles(res.files)
            setPopup()

            if(path == "*"){
                if(isRootOpen){
                    const resIndex = res.files.findIndex(f => f == file)
                    let i = 0; 
                    while(i < treeItems.length && treeItems[i].isFolder){
                        i++
                    }
                    i += resIndex;
                    const newTreeItems = treeItems.slice(0, i)
                        .concat({depth: 1, name : file.name, path: "*" + file.name, isFolder: false})
                        .concat(treeItems.slice(i))
                    setTreeItems(newTreeItems)
                }
            }
            else{
                
                const parentIndex = treeItems.findIndex(i => i.path == path)
                if(treeItems[parentIndex].isOpen){
                    
                    const resIndex = res.files.findIndex(f => f == file)
                    const depth = treeItems[parentIndex].depth + 1;
                    
                    let i = parentIndex + 1;
                    
                    while(i < treeItems.length && treeItems[i].isFolder){
                        i++
                    }
                    i += resIndex;
                    const newTreeItems = treeItems.slice(0, i)
                    .concat({depth: depth, name : file.name, path: path + "*" + file.name, isFolder: false})
                    .concat(treeItems.slice(insertIndex))
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
            <input type="file" id="fileInput" name='newFile'/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default UploadFile