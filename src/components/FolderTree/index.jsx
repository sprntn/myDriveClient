import { useEffect, useState } from 'react';
import styles from './style.module.css'
import { FaChevronLeft } from "react-icons/fa";
import TreeFolderRow from '../TreeFolderRow';
import useDataContext from '../../contexts/DataContext';
import TreeRoot from '../TreeRoot';
import TreeFileRow from '../TreeFileRow';
function FolderTree(){
    
    //const {treeItems, setTreeItems} = useDataContext()
    const {treeItems} = useDataContext()
    const [closeFolderTree, setCloseFolderTree] = useState(false)

    const toggleFolderTree = () => {
        console.log("toggle tree");
        setCloseFolderTree(!closeFolderTree)
    }
    console.log("tree items:\n", treeItems)
    return(
        <div className={`${styles.folderTreeContainer} ${closeFolderTree ? "" : styles.closed}`}>
            {/* <div className={styles.folderTree}> */}
            <div className={`${styles.folderTree} ${closeFolderTree ? "" : styles.closed}`}>
                {/* test */}
                <TreeRoot/>
                {treeItems.map(i => {
                    if(i.isFolder){
                        return <TreeFolderRow key={i.path + i.name} depth={i.depth} path={i.path} name={i.name} />
                    }
                    return <TreeFileRow key={i.path + i.name} depth={i.depth} path={i.path} name={i.name} />
                })}
            </div>
            <div className={styles.borderRight}>
                <div className={styles.line}></div>       
                <button className={`${styles.btn} ${closeFolderTree ? "" : styles.closed}`} onClick={toggleFolderTree}>
                    <FaChevronLeft />
                </button>       
                <div className={styles.line}></div>       
            </div>
        </div>
    )
}

export default FolderTree