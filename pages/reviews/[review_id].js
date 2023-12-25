import Header from "../../components/header";
import { useState } from "react";
import styles from "./addReview/addReview.module.css";
import { useRouter } from "next/router";

export default function Reviews() {
    const router = useRouter();

    const [reviewData, setReviewData] = useState([]);

    //This function sends the put request
    const sendReview = async (review_id) => {
        try {
            const response = await fetch(`/api/reviews/${review_id}`);
            if (!response.ok) {
                throw new Error('Error while fetching the review get request.');
            }
            //if there are no errors, send the user to the reviews page

        } catch (error) {
            console.log('caught an error in the put request');
            console.error('Error sending the new review:', error);    
        }
    };


  return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Review</h1>
            </div>
            <div className={styles.reviewContainer}>
            </div>
        </div>
    </>
)}