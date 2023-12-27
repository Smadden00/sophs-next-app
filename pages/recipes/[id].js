import Header from "../../components/header";
import { useState, useEffect } from "react";
import styles from "./addRecipe/addRecipe.module.css";
import { useRouter } from "next/router";

export default function Recipe() {
    const router = useRouter();
    const { id } = router.query

    const [recipeData, setRecipeData] = useState([]);
    const [loading, setLoading] = useState(true);

    const {recipe_name, ingredients, prep_time, rating, meal, instructions} = recipeData

    //Fetch the recipe data
    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await fetch(`/api/recipes/${id}`);
                if (!response.ok) {
                    throw new Error('Error while fetching the recipe data.');
                }
                const {body: [recipeData]} = await response.json();
                //if there are no errors, send the user to the recipes page
                setRecipeData(recipeData);
                setLoading(false)
            } catch (error) {
                console.log('caught an error while fetching the recipe data');
                console.error('Error:', error);    
            }
        };

        getRecipe();
    }, []);


  return (
    <>
        <Header />
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{recipe_name}</h1>
            </div>
            <div className={styles.reviewContainer}>
                <p>Ingredients: {ingredients}</p>
                <p>Meal: {meal}</p>
                <p>Prep Time: {prep_time}</p>
                <p>Rating: {rating}</p>
                <p>Instructions: {instructions}</p>
            </div>
        </div>
    </>
)}