import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useSession } from "next-auth/react"
import ProfileReviewTable from "../../components/reviewComponents/profileReviewTable";
import FetchProfileReviews from "../../components/requests/fetchProfileReviews";
import { useRouter } from "next/router";

export default function LoggedInProfileBody({}) {
    const router = useRouter();

    const {data: session} = useSession();

    const [profileRestReviewsData, setProfileRestReviewsData] = useState();
    const [profileRestReviewsLoading, setProfileRestReviewsLoading] = useState(true);

    useEffect(() => {
        if (session){
            FetchProfileReviews(setProfileRestReviewsData, setProfileRestReviewsLoading);
        }
    }, [session])

    const name = session.user.name;

    return (
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{name}</h1>
                </div>

                <div className={styles.contentContainer}>
                    <div className={styles.content}>
                        <ProfileReviewTable data={profileRestReviewsData} profileRestReviewsLoading={profileRestReviewsLoading}/>
                    </div>
                </div>

            </div>
    )
  
}