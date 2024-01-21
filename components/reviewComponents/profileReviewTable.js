import React from 'react';
import styles from "./profileReviewsTable.module.css";
import { useRouter } from "next/router";


export default function ProfileReviewTable({data, profileRestReviewsLoading}){

    const router = useRouter();

    const tableBody = profileRestReviewsLoading 
        ? <h2>LOADING</h2>
        : (
            <tbody>
                    {data.map((item, index) => (
                        <tr className={styles.tableItem} key={index} onClick={() => router.push(`/reviews/${item.review_id}`)}>
                            <td>{item.rest_name}</td>
                            <td>{item.o_rating}</td>
                        </tr>
                    ))}
            </tbody>
        );

  return (
        <div className={styles.tableContainer}>
            <h2 className={styles.title}>Your Restaurant Reviews</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Restaurant</th>
                    <th>Rating</th>
                </tr>
                </thead>
                {tableBody}
            </table>
        </div>
  );
};