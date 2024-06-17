//import { useRef } from 'react'
import styles from './style.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { GiCancel } from "react-icons/gi";
import { GiConfirmed } from "react-icons/gi";
import useDataContext from '../../contexts/DataContext';
import fetchService from '../../services/fetchService';

function DeleteItem(){

    const navigate = useNavigate()
    const { setPopup, treeItems, setTreeItems} = useDataContext()
    const location = useLocation()
    const path = location.pathname.split("/").slice(2)[0]
    
    const handleOk = () => {
        fetchService.deleteItem(path).then(res => {
            const itemIndex = treeItems.findIndex(i => i.path == path)
            if(itemIndex){
                const currentDepth = treeItems[itemIndex].depth
                if(treeItems[itemIndex].isFolder){
                    let endFolderIndex = itemIndex + 1
                    while(endFolderIndex < treeItems.length && treeItems[endFolderIndex].depth > currentDepth){
                        endFolderIndex++;
                    }
                    const newTreeItems = treeItems.slice(0, itemIndex).concat(treeItems.slice(endFolderIndex))
                    setTreeItems(newTreeItems)
                }
                else{
                    const newTreeItems = treeItems.slice(0, itemIndex).concat(treeItems.slice(itemIndex + 1))
                    setTreeItems(newTreeItems)
                }
            }
            
            setPopup()
            navigate(-1)
        })
    }

    const handleCancel = () => {
        setPopup()
    }

    return(
        <div className={styles.approval}>
            <h4>Are you sure you wants to delete this item?</h4>
            <div className={styles.btns}>
                <button onClick={handleCancel}><GiCancel /></button>
                <button onClick={handleOk}><GiConfirmed /></button>
            </div>
        </div>
    )
}

export default DeleteItem