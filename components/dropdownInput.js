import styles from "../pages/reviews/addReview/addReview.module.css";

export default function DropdownInput({title, list, value, callback}) {

    return (
        <div className={styles.inputBox}>
            <h1 className={styles.inputTitle}>{title}</h1>
            <select className={styles.stateDropdown} id="state-dropdown" value={value} onChange={(e)=>callback(e.target.value)}>
                <option value="">Select a {title}</option>
                {list.map((code) => (
                    <option key={code} value={code}>{code}</option>
                ))}
            </select>
        </div>
)}