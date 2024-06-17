import { NavLink } from 'react-router-dom'
import styles from './style.module.css'
import { FaRegFolderOpen } from "react-icons/fa";
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
    const {treeItems, setTreeItems, isRootOpen, setIsRootOpen} = useDataContext()
    
    
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
            
            setTreeItems([...foldersArr, ...filesArr])
            setIsRootOpen(true)
        })
    }

    const handleLess = () => {
        setTreeItems([])
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
    )
}

export default TreeRoot