import Header from "../../components/header";
import { useState, useEffect } from "react";
import styles from "./Recipe.module.css";
import { useRouter } from "next/router";

export default function Recipe() {
    const router = useRouter();
    const { id } = router.query

    const [recipeData, setRecipeData] = useState({});
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

    const ingredientsListItems = !Array.isArray(ingredients) ? undefined : ingredients.map((ingredient) => <li>{ingredient}</li>);
    const instructionsListItems = !Array.isArray(instructions) ? undefined : instructions.map((instruction, i) => <li>Step {i+1}: {instruction}</li>);

    if (loading){
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>LOADING</h1>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Header />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{recipe_name}</h1>
                        <div className={styles.subTitleContainer}>
                            <p>{meal}</p>
                            <p>Prep Time: {prep_time}</p>
                            <p>Rating</p>
                        </div>
                    </div>
                    <div className={styles.reviewContainer}>
                        <p>Ingredients:</p>
                        <ul>{ingredientsListItems}</ul>
                        <p>Instructions:</p>
                        <ul>{instructionsListItems}</ul>
                    </div>
                </div>
            </>
)}}