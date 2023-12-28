import styles from "../pages/reviews/addReview/addReview.module.css"

export default function NumberInput({range, inputTitle, value, callback}) {

    const input = range == 10 
      ? <input 
          type="number" 
          value={value} 
          onChange={(e) => callback(e.target.value)}
          id={inputTitle} 
          name={inputTitle} 
          min="0" 
          max="10" 
          step=".1" 
          size="3"
        />
      : range== 4 ?
        <input 
          type="number" 
          id={inputTitle} 
          value={value} 
          onChange={(e) => callback(e.target.value)}
          name={inputTitle} 
          min="1" 
          max="4" 
          step="1" 
          size="1"/>
          :
          <input 
          type="number" 
          id={inputTitle} 
          value={value} 
          onChange={(e) => callback(e.target.value)}
          name={inputTitle} 
          min="1" 
          max="500" 
          step="1" 
          size="3"/>
          ;

  return (
    <div className={styles.inputBox}>
        <h1 className={styles.inputTitle}>{inputTitle}</h1>
        {input}
    </div>
)}