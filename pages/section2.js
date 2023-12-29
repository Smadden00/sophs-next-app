import styles from "./Home.module.css";
import Link from "next/link"
import Image from 'next/image';

export default function Section2() {
  return (
    <div className={styles.section2}>
      <div className={styles.section2Background}>
        <div className={styles.section2BackgroundContent}>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              height={200}
              width={200}
              src="/images/galit.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              height={200}
              width={200}
              src="/images/mountainSandwich.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              height={250}
              width={250}
              src="/images/duckDuckGoat.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              height={150}
              width={150}
              src="/images/sophsLogo.png"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image}`} >
            <Image 
              className={styles.image}
              height={200}
              width={200}
              src="/images/sophsLogo.png"
              alt={"Food"}
            />
          </div>
        </div>
        <div className={styles.section2BackgroundContent2}>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              height={250}
              width={250}
              src="/images/duckDuckGoat.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              height={200}
              width={200}
              src="/images/galit.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              height={250}
              width={250}
              src="/images/duckDuckGoat.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              height={300}
              width={300}
              src="/images/mountainSandwich.jpeg"
              alt={"Food"}
            />
          </div>
          <div className={`${styles.section2Image2}`} >
            <Image 
              className={styles.image}
              height={175}
              width={175}
              src="/images/duckDuckGoat.jpeg"
              alt={"Food"}
            />
          </div>
        </div>
        <div className={styles.section2Text}>
          <h1>Find recipes and restaurant reviews from Sophia and the community...</h1>
        </div>
      </div>
    </div>
)}