import styles from "./Recipes.module.css";
import Header from "../../components/header";
import DynamicImage from "../../components/dynamicImage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";

export default function Recipes() {
  const router = useRouter();
  const [recipesData, setRecipesData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  console.log("This is is loading");
  console.log(isLoading);

  //Load in all the data
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try{
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Error in fetching all recipes.');
        }
        const javascriptResponse = await response.json();
        const recipesData = javascriptResponse.body.rows;
        setRecipesData(recipesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    };

    fetchAllRecipes();
  },[]);


  //build the images of each recipe
  const recipesImages = recipesData.map((recipeData, i) => <DynamicImage title={recipeData.recipe_name} subText={recipeData.prep_time} id={recipeData.recipe_id} reviewOrRecipe="Recipe" key={i} />);

  return (
    <>
    <Header />
    <div className={styles.recipeContainer}>
      <div className={styles.topRow}>
        <div className={styles.addContainer}>
          <div 
            className={styles.addButton} 
            onClick={() => router.push('recipes/addRecipe')}
          >
            <h2>Add Recipe</h2>
            <svg className={styles.addIcon} width="20" height="20" viewBox="0 0 16 16">
              <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Recipes</h1>
        </div>
        <div className={styles.filterContainer}>
          <div className={styles.filterButton}>
            <h2>Filters</h2>
            <svg className={styles.filterIcon} width="20" height="20" viewBox="0 0 16 16">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? <h1>LOADING</h1> : recipesImages}
      </div>
    </div>

    </>
)}


