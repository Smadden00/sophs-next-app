import styles from "./imageLink.module.css";
import Image from "next/image";
import { useState } from "react";

export default function ImageLink({title, subText}) {

  const [hover, setHover] = useState(false);


  const textBox = (
  <div className={styles.textBox}>
    <h1>{title}</h1>
    <h1>{subText}</h1>
  </div>
  )

  return (
    <div 
      className={styles.imgContainer}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image 
          style={{height: "250px", width: "auto"}}
          className={hover ? styles.darken : undefined}
          width="200" 
          height="200" 
          src="/images/galit.jpeg" 
          alt={"Food"}
      />
      {hover ? textBox : undefined}
    </div>
)}
