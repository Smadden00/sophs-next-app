import styles from "../pages/reviews/addReview/addReview.module.css"
import TextInput from "./textInput"

export default function ListInput({inputTitle, array, callback}) {

    const individualInputTitle = inputTitle == "Instructions" ? "Step" : inputTitle.slice(0, -1);

    //This function will be passed to each individual text input to update the main array
    const updateArray = (newValue, index) => {
        const newArray = [...array];
        newArray[index] = newValue;
        callback(newArray);
    };

    //When called, this function adds an empty value to the given array
    const addEmptyValueToArray = () => {
        const newArray = [...array, ""];
        callback(newArray);
    }

    const inputs = array.map((arrayItem, i) => <TextInput inputTitle={`${individualInputTitle} ${i+1}`} value={arrayItem} callback={updateArray} index={i} key={`${individualInputTitle} ${i+1}`}/>)

  return (
    <div className={styles.listContainer}>
        <h1 className={styles.inputTitle}>{inputTitle}</h1>
        <div className={styles.listValuesContainer}>
            {inputs}
        </div>
        <input 
            type="button"
            className={styles.listButton}
            value={`New ${individualInputTitle}`}
            onClick={() => addEmptyValueToArray()}
        />
    </div>
)}