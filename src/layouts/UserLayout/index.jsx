import { Outlet } from 'react-router-dom'
import FolderTree from '../../components/FolderTree'
import styles from './style.module.css'
import AsidePanel from '../../components/AsidePanel'

function UserLayout(){
    return(
        // <main className={styles.userPage}>
            <>
                <FolderTree/>
                <Outlet/>
                <AsidePanel/>
            </>
        // </main>
    )
}

export default UserLayout