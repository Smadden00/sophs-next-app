import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';
import { useState } from "react";

export default function Section3() {

  const [hover, setHover] = useState(false);
  const [subtext1, setSubtext1] = useState(false);
  const [subtext2, setSubtext2] = useState(false);

  const image = hover==1 ? <Image className={`${styles.image} ${styles.section3Image}`} height={350} width={350} src="/images/galit.jpeg" alt={"Food"}/> : hover==2 ? <Image className={`${styles.image} ${styles.section3Image}`} height={350} width={350} src="/images/duckDuckGoat.jpeg" alt={"Food"}/> : undefined;
  const subtext = (text) => <h2 className={styles.subtext}>{text}</h2>;


  return (
    <div className={styles.section3}>
      <div className={styles.section3LeftContainer}>
        <div className={styles.section3TitleContainer}>
          <h1>Soph's Reviews and Recipes</h1>
        </div>
        <div className={styles.section3ImageContainer}>
          {image}
        </div>
      </div>
      <div className={styles.section3TextContainer}>
        <div className={styles.section3InspirationContainer}>
          <Link style={{textDecoration: "none"}} href={{pathname: '/recipes'}}>
            <h1 
              onMouseEnter={() => {
                setHover(1);
                
                if(subtext2===false){
                  setSubtext1(true);
                } else {
                  setSubtext2(false);
                  setSubtext1(true);
                }
              }} 
              className={`${styles.section3LinkText} link`}
          >Inspiration</h1></Link>
          <div className={styles.subtextContainer}>
            {subtext1 ? subtext("Explore Soph's recipes...") : undefined}
          </div>
          <Link style={{textDecoration: "none"}} href={{pathname: '/reviews'}}><h1 
            className={`${styles.section3LinkText} link`}
            onMouseEnter={() => {
              setHover(2);

              if(subtext1===false){
                setSubtext2(true);
              } else {
                setSubtext1(false);
                setSubtext2(true);
              }
            }}
          >Indulgence</h1></Link>
          <div className={styles.subtextContainer}>
            {subtext2 ? subtext("Read Soph's restaurant reviews...") : undefined}
          </div>
        </div>
      </div>
    </div>
)}