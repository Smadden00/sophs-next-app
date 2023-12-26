import Header from "../../components/header";
import { useState, useEffect } from "react";
import styles from "./addReview/addReview.module.css";
import { useRouter } from "next/router";

export default function Review() {
    const router = useRouter();
    const { review_id } = router.query

    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);

    const {rest_name, description, experience, o_rating, price, taste} = reviewData

    console.log(reviewData)

    useEffect(() => {
        //This function fetches the review data
        const getReview = async () => {
            try {
                const response = await fetch(`/api/reviews/${review_id}`);
                if (!response.ok) {
                    throw new Error('Error while fetching the review data.');
                }
                const {body: [reviewData]} = await response.json();
                //if there are no errors, send the user to the reviews page
                setReviewData(reviewData);
                setLoading(false)
            } catch (error) {
                console.log('caught an error while fetching the review data');
                console.error('Error:', error);    
            }
        };

        getReview();
    }, []);


  return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Review of {rest_name}</h1>
            </div>

            <div className={styles.reviewContainer}>
                <h1>Description: {description}</h1>
                <p>Experience: {experience}</p>
                <p>Overall Rating: {o_rating}</p>
                <p>Price: {price}</p>
                <p>Taste: {taste}</p>
            </div>
        </div>
    </>
)}