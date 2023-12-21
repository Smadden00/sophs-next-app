import Header from "../../../components/header";
import { useState } from "react";
import styles from "./addReview.module.css";
import TextInput from "./textInput";
import NumberInput from "./numberInput";
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

            //if there are no errors, send the user to the reviews page
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

    //This function checks to see if there are any errors in the data. If there are not, then it makes a put request with that data.
    const submit = async (restaurantName, overallRating, price, taste, experience, description) => {   
        if ( //This if statement ensures that all of the vars are ok to send to the database. If I want more security I should do it here.
            restaurantName.trim() != '' &&
            (overallRating >= 0 && overallRating <= 10) &&
            (price >= 1 && price <= 4) &&
            (taste >= 0 && taste <= 10) &&
            (experience >= 0 && experience <= 10) &&
            description.trim() != '' &&
            !hasSingleQuote(restaurantName) && 
            !hasSingleQuote(description)
          ) {
            sendReview(restaurantName, overallRating, price, taste, experience, description);

          } else {
            console.log('There is an error while conducting the initial check in the submit function.')
            console.error('There is an error in the data that you input.')
          }
    };

  return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Add a Review</h1>
            </div>
            <div className={styles.inputsContainer}>
                <TextInput inputTitle="Restaurant Name" value={restaurantName} callback={setRestaurantName} />
                <NumberInput type={10} inputTitle="Overall Rating" value={overallRating} callback={setOverallRating} />
                <NumberInput type={4} inputTitle="Price" value={price} callback={setPrice} />
                <NumberInput type={10} inputTitle="Taste" value={taste} callback={setTaste} />
                <NumberInput type={10} inputTitle="Experience" value={experience} callback={setExperience} />
                <TextInput inputTitle="Description" value={description} callback={setDescription} />
            </div>
            <input 
                type="button" 
                value="Submit Review"
                onClick={() => {
                    submit(restaurantName, overallRating, price, taste, experience, description);
                }}
            />
        </div>
    </>
)}