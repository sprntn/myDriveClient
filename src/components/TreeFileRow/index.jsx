import styles from './style.module.css'
import { NavLink } from 'react-router-dom'
import { FaRegImage } from "react-icons/fa6";

function TreeFileRow({path, name, depth}){
    const baseWidth = 140;
    const halfItemWidth = 20;
    const indents = 6;
    
    return (
        <NavLink  to={"../file/" + path}>
            <div className={styles.fileRow} style={{ width: `${baseWidth - (depth % indents) * halfItemWidth}px` }}>
                <div className={styles.fileLink}>
                    <FaRegImage />
                    <p>{name}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default TreeFileRow