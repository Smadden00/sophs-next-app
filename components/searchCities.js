import styles from "../pages/reviews/addReview/addReview.module.css"
import { useState } from "react"
import SearchCityOption from "./searchCityOption";

export default function SearchCities({cities, value, callback}) {

    const [searching, setSearching] = useState(true);
    const [optionHover, setOptionHover] = useState(false);

    const cityOptions = ['San Antonio', 'Valparaiso', 'Texas']
    const cityOptionDivs = cityOptions.map((city)=> {
        return (
            <SearchCityOption city={city} callback={callback} />
        )});


    const citiesListDropdown = searching
        ? (
            <div className={styles.citiesSearchDropdown}>
                {cityOptionDivs}
            </div>
          )
        : undefined;


  return (
    <div className={styles.inputBox}>
        <h1 className={styles.inputTitle}>City/Town</h1>
        <div className={styles.citySearchContainer}>
            <textarea 
                id="Cities"
                value={value}
                onChange={(e)=> callback(e.target.value)}
            />
            {citiesListDropdown}
        </div>
    </div>
)}