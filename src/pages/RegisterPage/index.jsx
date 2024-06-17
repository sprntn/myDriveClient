//import axios from 'axios';
import styles from './style.module.css'
import { FaPaperPlane } from "react-icons/fa";
import fetchService from '../../services/fetchService';

function RegisterPage(){

    const handleSubmit = (e) => {
       
        e.preventDefault();
        const formData = new FormData(e.target)
        

        fetchService.register({
            email:formData.get("userEmail"),
            password: formData.get("userPassword"),
            fullName: formData.get("userName")
        }).then(res => console.log(res))
    }

    return(
        <form className={`${styles.registerForm} page`} onSubmit={handleSubmit}>
            <label htmlFor="nameInput">Enter your name</label>
            <input type="text" id="nameInput" name='userName'/>
            <label htmlFor="emailInput">Enter your email</label>
            <input type="text" id="emailInput" name='userEmail'/>
            <label htmlFor="passwordInput">Enter a password</label>
            <input type="text" id="passwordInput" name='userPassword'/>
            <button type="submit">Submit<FaPaperPlane /></button>
        </form>
    )
}

export default RegisterPage