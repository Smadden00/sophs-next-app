import styles from "./Reviews.module.css";
import Header from "../../components/header";
import ImageLink from "../../components/imageLink.js"
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";

export default function Reviews() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const images = data.map((row, i) => <ImageLink title={row.rest_name} subText={row.o_rating} key={i}/>)

  useEffect(() => {
    console.log('in the use effect')
    const fetchData = async () => {
      try{
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        console.log('in page after response');
        const dataResponse = await response.json();
        const data = dataResponse.body.rows;
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log('caught an error in the page');
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
  },[]);

  return (
    <>
    <Header />
    <div className={styles.reviewsContainer}>
      <div className={styles.topRow}>
        <div className={styles.addContainer}>
          <div 
            className={styles.addButton} 
            onClick={() => router.push('reviews/addReview')}
          >
            <h2>Add Review</h2>
            <svg className={styles.addIcon} width="20" height="20" viewBox="0 0 16 16">
              <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Reviews</h1>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterButton}>
            <h2>Filters</h2>
            <svg className={styles.filterIcon} width="20" height="20" viewBox="0 0 16 16">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? <h1>LOADING</h1> : images}
      </div>
    </div>

    </>
)}


