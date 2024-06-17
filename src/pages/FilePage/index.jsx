import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import useDataContext from '../../contexts/DataContext'

function FilePage(){

    const {filePath} = useParams()
    
    const {loggedUser} = useDataContext()
    

    const baseImgUrl = "http://localhost:3000/"
    const endPoint = filePath.split("*").slice(1).join("/")
    
    const imgUrl = `${baseImgUrl}${loggedUser}/root/${endPoint}`
    return(
        <div className={`${styles.filePage} page`}>
            <img src={imgUrl} alt="" />
        </div>
    )
}

export default FilePage