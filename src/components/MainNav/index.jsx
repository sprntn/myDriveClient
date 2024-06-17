import styles from './style.module.css'
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// import { AiOutlineFileAdd } from "react-icons/ai";
// import { HiOutlineFolderRemove } from "react-icons/hi";
// import { FaCloudDownloadAlt } from "react-icons/fa";
import { PiCloudFogBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
// import AddFolder from '../AddFolder';
// import DeleteFolder from '../DeleteFolder';
import useDataContext from '../../contexts/DataContext';
// import UploadFile from '../UploadFile';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLoginCircleLine } from "react-icons/ri";
import { AiOutlineSignature } from "react-icons/ai";

function MainNav(){
    //const {setPopup, isLogged, setIsLogged} = useDataContext()
    const { loggedUser, setLoggedUser} = useDataContext()
    const navigate = useNavigate();
    console.log("is logged user:", loggedUser)

    // const navBack = () => {
    //     console.log("nav Back");
    //     navigate(-1)
    // }

    // const addFolder = () => {
    //     console.log("add folder");
        
    //     setPopup(<AddFolder />)
    // }

    // const addFile = () => {
    //     console.log("add file")
    //     setPopup(<UploadFile />)
    // }

    // const deleteFolder = () => {
    //     console.log("delete folder")

    //     setPopup(<DeleteFolder />)
    // }

    const handleLogout = () => {
        setLoggedUser()//set loggedUser to undefined
        localStorage.removeItem('userRoot');
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegister = () => {
        navigate("/register")
    }

    return(
        <div className={styles.mainNav}>
            <div className={styles.logo}>
                <div className={styles.logoBorder}>
                    {/* <FaCloudDownloadAlt /> */}
                    <PiCloudFogBold />
                </div>
                <p>cloud storage ltd</p>
            </div>
            {/* <div className={styles.folderActions}>
                <button onClick={navBack}><IoArrowBackCircleOutline /></button>
                <button onClick={addFolder}><HiOutlineFolderAdd /></button>
                <button onClick={addFile}><AiOutlineFileAdd /></button>
                <button onClick={deleteFolder}><HiOutlineFolderRemove /></button>
            </div> */}
            <div className={styles.user}>
                {loggedUser ? 
                    <>
                        <div className={styles.userText}>
                            <p>wellcome (user name)</p>
                            <button className={styles.logout} onClick={handleLogout}>
                                <RiLogoutCircleRLine />Logout
                            </button>
                        </div>
                        <img src="\userAvatar.jpeg" alt="userAvatar" />
                    </> : 
                    <>
                        <div className={styles.guestText}>
                            <p>hello guest</p>
                            <button className={styles.login} onClick={handleLogin}>
                                <RiLoginCircleLine />Login
                            </button>
                            <button className={styles.login} onClick={handleRegister}>
                                <AiOutlineSignature />sign up
                            </button>
                        </div>
                    </>
                }
                {/* <div className={styles.userText}>
                    <p>wellcome (user name)</p>
                    <button className={styles.logout}>
                        <RiLogoutCircleRLine />Logout
                    </button>
                </div>
                <img src="\userAvatar.jpeg" alt="userAvatar" /> */}
            </div>
        </div>
    )
}

export default MainNav