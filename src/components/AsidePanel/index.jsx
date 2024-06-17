import styles from './style.module.css'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { HiOutlineFolderRemove } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';
import useDataContext from '../../contexts/DataContext';
import AddFolder from '../AddFolder';
import UploadFile from '../UploadFile';
import DeleteFolder from '../DeleteItem';

function AsidePanel(){
    const location = useLocation()
    //const path = location.pathname.split("/").slice(2)[0]
    const pathArr = location.pathname.split("/")
    //console.log(pathArr)
    const {setPopup} = useDataContext()
    const navigate = useNavigate();
    const navBack = () => {
        //navigate(-1)
        //const prevPath = pathArr.slice(0, -1)
        //console.log(`/${pathArr[1]}/${pathArr[2].split("*").slice(0, -1).join('*')}`)
        //navigate(`/${pathArr[1]}/${pathArr[2].split("*").slice(0, -1).join('*')}`)
        const path = `${pathArr[2].split("*").slice(0, -1).join('*')}`
        //const basePath = "/folder/"
        const backPath = path != "" ? `/folder/${path}` : ""
        console.log("back path: ",backPath);
        navigate(backPath)
    }

    const addFolder = () => {
        setPopup(<AddFolder />)
    }

    const addFile = () => {
        setPopup(<UploadFile />)
    }

    const deleteFolder = () => {
        setPopup(<DeleteFolder />)
    }

    return(
        <div className={styles.rightPanel}>
            {pathArr.length > 2 && <button onClick={navBack}><IoArrowBackCircleOutline /></button>}
            <button onClick={addFolder}><HiOutlineFolderAdd /></button>
            <button onClick={addFile}><AiOutlineFileAdd /></button>
            {pathArr.length > 2 && <button onClick={deleteFolder}><HiOutlineFolderRemove /></button>}
        </div>
    )
}

export default AsidePanel