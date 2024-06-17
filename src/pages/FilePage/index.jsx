import { useParams } from 'react-router-dom'
import styles from './style.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useDataContext from '../../contexts/DataContext'

function FilePage(){

    const {filePath} = useParams()
    console.log("filePage",filePath)
    const {loggedUser} = useDataContext()
    //const [text, setText] = useState("before")
    //const [imageSrc, setImageSrc] = useState(null);
    //const [image, setImage] = useState(null);

    //const baseUrl = "http://localhost:3000/file/get-file/"
    
    // useEffect(() => {
    //     // axios.get(baseUrl + filePath).then(res => {
    //     //     console.log(res)
    //     //     setImage(res.data)
    //     // })
    //     axios.get(baseUrl + filePath, {responseType: 'blob'})
    //     .then(res => {
    //         console.log(res)
    //         const imageBlob = res.data;
    //         const imageObjectURL = URL.createObjectURL(imageBlob);
    //         console.log(imageObjectURL);
    //         setImageSrc(imageObjectURL);
    //     })
    // }, [])

    const baseImgUrl = "http://localhost:3000/"
    const endPoint = filePath.split("*").slice(1).join("/")
    //console.log(endPoint);
    //const imgUrl = `${baseImgUrl}usersStorage/${loggedUser}/root/${endPoint}`
    const imgUrl = `${baseImgUrl}${loggedUser}/root/${endPoint}`
    console.log(imgUrl);
    console.log(`${baseImgUrl}user1@example.com/root/${endPoint}`)

    return(
        <div className={`${styles.filePage} page`}>
            {/* {image ? <img src={image} alt="" /> : <p>Loading image...</p>} */}
            {/* {imageSrc ? <img src={imageSrc} alt="" /> : <p>Loading image...</p>} */}
            {/* <img src='http://localhost:3000/testFolder2/Bear.png' alt='' /> */}
            {/* <img src={`${baseImgUrl}${endPoint}`} alt="" /> */}
            <img src={imgUrl} alt="" />
        </div>
    )
}

export default FilePage