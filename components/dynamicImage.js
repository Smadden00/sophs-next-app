import styles from "./dynamicImage.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router.js";

export default function DynamicImage({title, subText, id, reviewOrRecipe}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const textBox = reviewOrRecipe == "Review" 
  ? (
    <div 
      className={styles.textBox} 
      onClick={() => router.push(`/reviews/${id}`)}
    >
      <h1>{title}</h1>
      <h1>{subText}</h1>
    </div>
  ) 
  : (
    <div 
      className={styles.textBox} 
      onClick={() => router.push(`/recipes/${id}`)}
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
