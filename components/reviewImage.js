import styles from "./reviewImage.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router.js";

export default function ReviewImage({title, subText, review_id}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const textBox = (
  <div 
    className={styles.textBox} 
    onClick={() => router.push(`/reviews/${review_id}`)}
  >
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
