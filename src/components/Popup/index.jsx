import styles from './style.module.css'

function Popup({popup, setPopup}){
    return (
        <div className={styles.popupWraper} onClick={()=>setPopup()}>
            <div onClick={(e) => { e.stopPropagation() }}>{popup}</div>  
        </div> 
    )
}

export default Popup