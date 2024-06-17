// import {Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import FolderPage from "../pages/FolderPage"
import FilePage from "../pages/FilePage"
import { useEffect } from "react"
import useDataContext from "../contexts/DataContext"
import UserLayout from "../layouts/UserLayout"
import RegisterPage from "../pages/RegisterPage"



function Content(){
    //const {isLogged} = useDataContext()
    const {loggedUser} = useDataContext()
    console.log("is logged user:", loggedUser)
    return(
        <>
            {/* <HomePage/>            <Route path='category/:categoryName' element={<CategoriesNav />} > */}
            <Routes>
                {/* <Route index element={<HomePage/>}/> */}
                {/* <Route index element={isLogged ? <HomePage/> : <LoginPage/>} /> */}
                <Route path="/" element={loggedUser ? <UserLayout/> : <Navigate to="/login" />} >
                    <Route index element={<HomePage/>}/>
                    <Route path="/folder/:folderPath" element={<FolderPage />} />
                    <Route path="/file/:filePath" element={<FilePage />} />
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                {/* <Route path="/folder/:folderPath" element={<FolderPage />} />
                <Route path="/file/:filePath" element={<FilePage />} /> */}
            </Routes>
        </>
    )
}

export default Content