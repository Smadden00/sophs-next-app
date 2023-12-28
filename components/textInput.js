import styles from "../pages/reviews/addReview/addReview.module.css"

export default function TextInput({inputTitle, value, callback, index}) {

  return (
    <div className={styles.inputBox}>
        <h1 className={styles.inputTitle}>{inputTitle}</h1>
        <textarea 
            id={inputTitle}
            value={value}
            onChange={(e)=> {
                //This allows for the text input to update only a certain value of a given array if necessary
                if (index||index===0) {
                    callback(e.target.value, index)
                } else {
                //if the value is not part of an array (indicated by the presence of index) then it will just callback with the normal value
                    callback(e.target.value)
                }
            }}
        />
    </div>
)}