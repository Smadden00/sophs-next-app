import styles from "./reviewCard.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router.js";
import BuildPriceSigns from "./functions/buildPriceSigns";

export default function ReviewCard({title, location, cuisine, price, rating, id}) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const priceSigns=BuildPriceSigns(price);

  const reviewCardContainerStyle = hover ? `${styles.reviewCardContainerHover} ${styles.reviewCardContainer}`: `${styles.reviewCardContainer}`;

  return (
    <div 
      className={reviewCardContainerStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
        <div 
            className={styles.textBox}
            onClick={() => router.push(`/reviews/${id}`)}
        >
            <p className={styles.title}>{title}</p>
            <p>Rating: {rating} / 10</p>
            <p>Price: {priceSigns}</p>
            <p>{cuisine}</p>
            <p>{location}</p>
        </div>
    </div>
)}
