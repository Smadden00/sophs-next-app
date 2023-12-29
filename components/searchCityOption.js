import styles from "../pages/reviews/addReview/addReview.module.css"
import { useState } from "react"

export default function SearchCityOption({city, callback}) {

    const [optionHover, setOptionHover] = useState(false);

  return (
    <div 
        className={optionHover ? `${styles.cityOption} ${styles.cityOptionHover}` : styles.cityOption} 
        onClick={()=>callback(city)} 
        onMouseEnter={()=>setOptionHover(true)}
        onMouseLeave={()=>setOptionHover(false)}
    >
        {city}
    </div>
)}