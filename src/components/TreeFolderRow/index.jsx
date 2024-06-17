import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import { FaRegFolderOpen } from "react-icons/fa";
import { useState } from 'react';
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import fetchService from '../../services/fetchService';
import useDataContext from '../../contexts/DataContext';

function TreeFolderRow({path, name, depth}){
    const baseWidth = 140;
    const halfItemWidth = 20;
    const indents = 6;
    const [isOpen, setIsOpen] = useState(false)
    const {treeItems, setTreeItems} = useDataContext()
    
    
    const handleMore = () => {
        
        fetchService.getFolderContent(path).then(res => {
            
            const foldersArr = res.folders.map(folder => {
                const name = folder;
                const newDepth = depth + 1;
                const newPath = path + "*" + name;
                const isFolder = true;

                return {depth: newDepth, name, path: newPath, isFolder, isOpen: false}
            })
            const filesArr = res.files.map(file => {
                const name = file;
                const newDepth = depth + 1;
                const newPath = path + "*" + name;
                const isFolder = false;

                return {depth: newDepth, name, path: newPath, isFolder, isOpen: false}
            })
            const limit = treeItems.length;
            const currentIndex = treeItems.findIndex(i => i.path == path)
            const currentItem = treeItems[currentIndex]
            currentItem.isOpen = true;
            const newTreeItems = treeItems.slice(0, currentIndex).concat(currentItem, foldersArr, filesArr, treeItems.slice(currentIndex + 1))
            setTreeItems(newTreeItems)
            setIsOpen(true)
        })
    }

    const handleLess = () => {
        const currentIndex = treeItems.findIndex(i => i.path == path)
        
        const currentDepth = treeItems[currentIndex].depth
       
        const limit = treeItems.length;
        
        let index = currentIndex + 1;
        while(index < limit && treeItems[index].depth > currentDepth){
            
            index++;
        }

        const newTreeItems = treeItems.slice(0, currentIndex + 1).concat(treeItems.slice(index))
        
        setTreeItems(newTreeItems)
        setIsOpen(false)
    }

    return (
        <div className={styles.folderRow} style={{ width: `${baseWidth - (depth % indents) * halfItemWidth}px` }}>
            <NavLink to={"../folder/" + path}>
                <div className={styles.folderLink}>
                    <FaRegFolderOpen />
                    <p>{name}</p>
                </div>
            </NavLink>
            <div className={styles.openClose}>
                {isOpen ? 
                <button onClick={handleLess}><MdExpandLess /></button>:
                <button onClick={handleMore}><MdExpandMore /></button> 
                }
            </div>
            
        </div>
    )
}

export default TreeFolderRow