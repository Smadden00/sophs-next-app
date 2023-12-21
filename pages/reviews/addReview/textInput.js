import styles from "./addReview.module.css";

export default function TextInput({inputTitle, value, callback}) {

  return (
    <div className={styles.inputBox}>
        <h1 className={styles.inputTitle}>{inputTitle}</h1>
        <textarea 
            id={inputTitle}
            value={value}
            onChange={(e)=>callback(e.target.value)}
        />
    </div>
)}