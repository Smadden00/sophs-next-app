/*
This function will handle the get review request
*/
import pool from "../../../backend-utils";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            //the recipes data is held in three different databases, the recipes table, the recipe_instructions table, and the recipe_ingredients table.
            //this code will fetch data from these three tables then combine them to send to the front end 
            
            const { id } = req.query;
            
            //get the data from the recipes table
            const recipesData = await pool.query(`SELECT * FROM recipes WHERE recipe_id=${id};`);  
            
            //get the data from the recipe_instructions table
            const instructionsResponse = await pool.query(`SELECT instruction FROM recipe_instructions WHERE recipe_id=${id} ORDER BY instruction_order ASC;`);  
            const instructions = instructionsResponse.rows.map( ({instruction}) => instruction);

            //get the data from the recipe_ingredients table
            const ingredientsResponse = await pool.query(`SELECT ingredient FROM recipe_ingredients WHERE recipe_id=${id};`);  
            const ingredients = ingredientsResponse.rows.map( ({ingredient}) => ingredient);

            //combine the data of the recipesData and instructions
            const combinedData = recipesData.rows.map(item => ({
                ...item,
                ingredients: ingredients,
                instructions: instructions
            }));
            
            res.status(200).json({ body: combinedData });
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the recipe and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the recipe request wasnt GET');
    }

}