import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import { FaRegFolderOpen } from "react-icons/fa";
import { useState } from 'react';
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import fetchService from '../../services/fetchService';
import useDataContext from '../../contexts/DataContext';

function TreeRoot(){
    const path = ""
    const name = "Home"
    const depth = 0;
    const baseWidth = 140;
    const halfItemWidth = 20;
    const indents = 6;
    // const [isOpen, setIsOpen] = useState(false)
    const {treeItems, setTreeItems, isRootOpen, setIsRootOpen} = useDataContext()
    console.log()
    
    const handleMore = () => {
        fetchService.getFolderContent(path).then(res => {
            //find index, then add from there, folders then files
            //find current index
            // {depth: 0, name: "test", path: "/", isFile: true},
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
            // const limit = treeItems.length;
            // const currentIndex = treeItems.findIndex(i => i.path == path)
            // const newTreeItems = treeItems.slice(0, currentIndex).concat(foldersArr, filesArr, treeItems.slice(currentIndex))
            // setTreeItems(newTreeItems)
            setTreeItems([...foldersArr, ...filesArr])
            //setIsOpen(true)
            setIsRootOpen(true)
        })
    }

    const handleLess = () => {
        setTreeItems([])
        //setIsOpen(false)
        setIsRootOpen(false)
    }

    return (
        <div className={styles.folderRow} style={{ width: `${baseWidth - (depth % indents) * halfItemWidth}px` }}>
            <NavLink  to={path}>
                <div className={styles.folderLink}>
                    <FaRegFolderOpen />
                    <p>{name}</p>
                </div>
            </NavLink>
            <div className={styles.openClose}>
                {isRootOpen ? 
                <button onClick={handleLess}><MdExpandLess /></button>:
                <button onClick={handleMore}><MdExpandMore /></button> 
                }
            </div>
        </div>
        // <NavLink  to={path}>
        //     <div className={styles.folderRow} style={{ width: `${baseWidth - (depth % indents) * halfItemWidth}px` }}>
        //         <div className={styles.folderLink}>
        //             <FaRegFolderOpen />
        //             <p>{name}</p>
        //             {/* <button onClick={() => {setIsOpen(!isOpen)}}>
        //                 {isOpen ? <MdExpandLess /> : <MdExpandMore />}
        //             </button> */}
        //             {isOpen ? 
        //             <button onClick={handleLess}><MdExpandLess /></button>:
        //             <button onClick={handleMore}><MdExpandMore /></button> 
        //             }
        //         </div>
        //     </div>
        // </NavLink>
    )
}

export default TreeRoot