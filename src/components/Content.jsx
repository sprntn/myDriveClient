
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import FolderPage from "../pages/FolderPage"
import FilePage from "../pages/FilePage"

import useDataContext from "../contexts/DataContext"
import UserLayout from "../layouts/UserLayout"
import RegisterPage from "../pages/RegisterPage"



function Content(){
    const {loggedUser} = useDataContext()
    
    return(
        <>
            
            <Routes>
                
                <Route path="/" element={loggedUser ? <UserLayout/> : <Navigate to="/login" />} >
                    <Route index element={<HomePage/>}/>
                    <Route path="/folder/:folderPath" element={<FolderPage />} />
                    <Route path="/file/:filePath" element={<FilePage />} />
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                
            </Routes>
        </>
    )
}

export default Content