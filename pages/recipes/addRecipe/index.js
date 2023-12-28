import Header from "../../../components/header";
import { useState } from "react";
import styles from "./addRecipe.module.css";
import TextInput from "../../../components/textInput";
import NumberInput from "../../../components/numberInput";
import ListInput from "../../../components/listInput";
import { useRouter } from "next/router";

export default function AddRecipe() {
    const router = useRouter();

    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [prepTime, setPrepTime] = useState(0);
    const [rating, setRating] = useState(0);
    const [meal, setMeal] = useState('');
    const [instructions, setInstructions] = useState([]);

    //This function sends the put request
    const sendReview = async (recipeName, ingredients, prepTime, rating, meal, instructions) => {
        try {
            //perform initial safety checks on the data that the client gave
            if(            
                false
            ){
                throw new Error('There is an error in the data that you input.')
            }

            //send the put request
            const response = await fetch('/api/recipes', {
                method: 'PUT',
                body: JSON.stringify({
                    recipe_name: recipeName,
                    ingredients: ingredients, 
                    prep_time: prepTime, 
                    rating: rating, 
                    meal: meal, 
                    instructions: instructions, 
                })
            });

            if (!response.ok) {
                throw new Error('Could not make put request.');
            }

            //if there are no errors, send the user back to the recipes page
            router.push('/recipes');
        } catch (error) {
            console.log('caught an error in the put request');
            console.error('Error sending the new review:', error);    
        }
    };

  return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Add a Recipe</h1>
            </div>
            <div className={styles.inputsContainer}>
                <TextInput inputTitle="Recipe Name" value={recipeName} callback={setRecipeName} />
                <NumberInput range={100} inputTitle="Prep Time" value={prepTime} callback={setPrepTime} />
                <NumberInput range={10} inputTitle="Rating" value={rating} callback={setRating} />
                <TextInput inputTitle="Meal" value={meal} callback={setMeal} />
                <ListInput inputTitle="Ingredients" array={ingredients} callback={setIngredients}/>
                <ListInput inputTitle="Instructions" array={instructions} callback={setInstructions}/>
            </div>
            <input 
                type="button" 
                value="Submit Recipe"
                onClick={() => {
                    sendReview(recipeName, ingredients, prepTime, rating, meal, instructions);
                }}
            />
        </div>
    </>
)}