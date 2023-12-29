import styles from "../pages/reviews/addReview/addReview.module.css"
import { useState, useEffect } from "react"
import SearchCityOption from "./searchCityOption";

export default function SearchCities({cities, currCityVal, currCityValCallback}) {

    const [optionHover, setOptionHover] = useState(false);
    const [currentlySearching, setCurrentlySearching] = useState(true);

    const filteredCities = cities.filter((indivCityInList) => indivCityInList.toLowerCase().includes(currCityVal.toLowerCase()));
    const cityOptionDivs = filteredCities.map((filteredCity)=> {
        return (
            <SearchCityOption city={filteredCity} currCityValCallback={currCityValCallback} searchingCallback={setCurrentlySearching} key={filteredCity}/>
        )});

    useEffect(() => {
        setCurrentlySearching(true);
      },[currCityVal]);

    const citiesListDropdown = (
            <div className={styles.citiesSearchDropdown}>
                {cityOptionDivs}
            </div>
          );


  return (
    <div className={styles.inputBox}>
        <h1 className={styles.inputTitle}>City/Town</h1>
        <div className={styles.citySearchContainer}>
            <textarea 
                id="Cities"
                value={currCityVal}
                onChange={(e)=> currCityValCallback(e.target.value)}
            />
            {currCityVal && currCityVal.length>1 && currentlySearching ? citiesListDropdown : undefined}
        </div>
    </div>
)}