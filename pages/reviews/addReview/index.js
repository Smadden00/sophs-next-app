import Header from "../../../components/header";
import { useState } from "react";
import styles from "./addReview.module.css";
import TextInput from "../../../components/textInput";
import NumberInput from "../../../components/numberInput";
import { useRouter } from "next/router";

export default function Reviews() {
    const router = useRouter();

    const [restaurantName, setRestaurantName] = useState('');
    const [type, setType] = useState([]);
    const [overallRating, setOverallRating] = useState(0.0);
    const [price, setPrice] = useState(1);
    const [taste, setTaste] = useState(0.0);
    const [experience, setExperience] = useState(0.0);
    const [description, setDescription] = useState('');

    //This function sends the put request
    const sendReview = async (restaurantName, overallRating, price, taste, experience, description) => {
        try {
            //perform initial safety checks on the data that the client gave
            if(            
                restaurantName.trim() == '' &&
                !(overallRating >= 0 && overallRating <= 10) &&
                !(price >= 1 && price <= 4) &&
                !(taste >= 0 && taste <= 10) &&
                (!experience >= 0 && experience <= 10) &&
                description.trim() == '' &&
                hasSingleQuote(restaurantName) && 
                hasSingleQuote(description)
            ){
                throw new Error('There is an error in the data that you input.')
            }
            const response = await fetch('/api/reviews', {
                method: 'PUT',
                body: JSON.stringify({
                    rest_name: restaurantName,
                    o_rating: overallRating, 
                    price: price, 
                    taste: taste, 
                    experience: experience, 
                    description: description, 
                    user_id_submitted: 1, 
                    soph_submitted: false
                })
            });
            if (!response.ok) {
                throw new Error('Could not make put request.');
            }

            //if there are no errors, send the user back to the reviews page
            router.push('/reviews');
        } catch (error) {
            console.log('caught an error in the put request');
            console.error('Error sending the new review:', error);    
        }
    };

    //this is used to ensure that there are no single quotes in a given string
    const hasSingleQuote = (string) => {
        return /'/g.test(string);
    }

  return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Add a Review</h1>
            </div>
            <div className={styles.inputsContainer}>
                <TextInput inputTitle="Restaurant Name" value={restaurantName} callback={setRestaurantName} />
                <NumberInput range={10} inputTitle="Overall Rating" value={overallRating} callback={setOverallRating} />
                <NumberInput range={4} inputTitle="Price" value={price} callback={setPrice} />
                <NumberInput range={10} inputTitle="Taste" value={taste} callback={setTaste} />
                <NumberInput range={10} inputTitle="Experience" value={experience} callback={setExperience} />
                <TextInput inputTitle="Description" value={description} callback={setDescription} />
            </div>
            <input 
                type="button" 
                value="Submit Review"
                onClick={() => {
                    sendReview(restaurantName, overallRating, price, taste, experience, description);
                }}
            />
        </div>
    </>
)}