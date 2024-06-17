import styles from './style.module.css'
import { FaPaperPlane } from "react-icons/fa";
import fetchService from '../../services/fetchService';
import useDataContext from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

function LoginPage(){

    const navigate = useNavigate()
    
    //const {setIsLogged} = useDataContext()
    const {setLoggedUser} = useDataContext()

    const handleSubmit = (e) => {
        console.log("submit")
        e.preventDefault();
        const formData = new FormData(e.target)
        const formObject = Object.fromEntries(formData)
        console.log(formObject)
        // fetchService.login(formObject).then(res => {
        //     console.log(res)
        //     localStorage.setItem('token', res.token)
        //     setIsLogged(true)
        //     navigate("/")
        // })
        fetchService.login({
            email:formData.get("userEmail"),
            password: formData.get("userPassword")
        }).then(res => {
            console.log(res)
            localStorage.setItem('token', res.token)
            localStorage.setItem('userRoot', formData.get("userEmail"))
            //setIsLogged(true)
            setLoggedUser(formData.get("userEmail"))//for now, later will be received from the server
            navigate("/")
        })
    }
    return(
        <form className={`${styles.loginForm} page`} onSubmit={handleSubmit}>
            <label htmlFor="emailInput">Enter your name</label>
            <input type="text" id="emailInput" name='userEmail'/>
            <label htmlFor="passwordInput">Enter your password</label>
            <input type="text" id="passwordInput" name='userPassword'/>
            <button type="submit">Submit<FaPaperPlane /></button>
        </form>
    )
}

export default LoginPage