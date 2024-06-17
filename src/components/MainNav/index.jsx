import styles from './style.module.css'
import { PiCloudFogBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import useDataContext from '../../contexts/DataContext';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLoginCircleLine } from "react-icons/ri";
import { AiOutlineSignature } from "react-icons/ai";

function MainNav(){
    const { loggedUser, setLoggedUser} = useDataContext()
    const navigate = useNavigate();
    

    const handleLogout = () => {
        setLoggedUser()
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
                    
                    <PiCloudFogBold />
                </div>
                <p>cloud storage ltd</p>
            </div>
            
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
                
            </div>
        </div>
    )
}

export default MainNav