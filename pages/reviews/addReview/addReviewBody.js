import { useState } from "react";
import styles from "./addReview.module.css";
import TextInput from "../../../components/textInput.js";
import NumberInput from "../../../components/numberInput.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DropdownInput from "../../../components/dropdownInput.js"
import StateCodes from "../../../components/consts/state_codes.js";
import SendReview from "../../../components/requests/SendReview.js";
import FetchCities from "../../../components/requests/fetchCities.js";
import SearchCities from "../../../components/searchCities.js";


export default function AddReviewBody() {
    const router = useRouter();

    const [restaurantName, setRestaurantName] = useState('');
    const [state, setState] = useState('');
    const [cities, setCities] = useState([]);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [city, setCity] = useState('')
    const [type, setType] = useState([]);
    const [overallRating, setOverallRating] = useState(0.0);
    const [price, setPrice] = useState(1);
    const [taste, setTaste] = useState(0.0);
    const [experience, setExperience] = useState(0.0);
    const [description, setDescription] = useState('');

    const state_codes=StateCodes();

    useEffect(() => {
        if(state!==''){
            setCitiesLoading(true);
            FetchCities(state, setCities, setCitiesLoading);
        }
      },[state]);

  return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Add a Review</h1>
            </div>
            <div className={styles.inputsContainer}>
                <TextInput inputTitle="Restaurant Name" value={restaurantName} callback={setRestaurantName} />
                <DropdownInput title={"State"} list={state_codes} value={state} callback={setState}/>
                <SearchCities cities={cities} currCityVal={city} currCityValCallback={setCity}/>
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
                    SendReview(router, restaurantName, overallRating, price, taste, experience, description, state, city, cities);
                }}
            />
        </div>
)}