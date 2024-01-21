/*
This function will handle the get all recipes and put recipe calls
*/
import pool from "../../../backend-utils";
import Encrypt from "../../../components/functions/encrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const client = await pool.connect()
            const data = await client.query('SELECT * FROM recipes;');
            res.status(200).json({ body: data });
        } catch (error) {
            res.status(500).json({message: "There was an error and we could not complete your get all recipes request. Error: "+ error});
        }
    } else if (method == "PUT"){
        try{

            //ensure the user is authorized to make a put request then encrypt the user identifier
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(500).json({ message: 'The request was unauthorized' });
            }
            const user_encrypted = Encrypt(session.user.email)
            
            const {recipe_name, ingredients, prep_time, rating, meal, instructions} = JSON.parse(req.body);
            const recipesResponse = await pool.query(`INSERT INTO recipes(recipe_name, prep_time, rating, meal, user_encrypted) VALUES ('${recipe_name}', ${prep_time}, ${rating}, '${meal}', '${user_encrypted}') RETURNING recipe_id;`);

            const [{recipe_id}] = recipesResponse.rows
            
            //Here, I build the value portion of the instructions SQL query (as a string) that will go into the database
            let instructionsValues = ""
            instructions.forEach((instruction, i) => {
                if (i==0){
                    instructionsValues+=`(${recipe_id}, ${i}, '${instruction}')`
                } else {
                    instructionsValues+=`, (${recipe_id}, ${i}, '${instruction}')`
                }
            });
            const instructionResponse = await pool.query(`INSERT INTO recipe_instructions(recipe_id, instruction_order, instruction) VALUES ${instructionsValues};`)

            //Here, I build the value portion of the ingredients SQL put query (as a string) that will go into the database
            let ingredientValues = ""
            ingredients.forEach((ingredient, i) => {
                if (i==0){
                    ingredientValues+=`(${recipe_id}, '${ingredient}')`
                } else {
                    ingredientValues+=`, (${recipe_id}, '${ingredient}')`
                }
            });
            const ingredientResponse = await pool.query(`INSERT INTO recipe_ingredients(recipe_id, ingredient) VALUES ${ingredientValues};`)

            res.status(200).json({message: [recipesResponse, instructionResponse, ingredientResponse], body: req.body})
        } catch {
            res.status(500).json({message: "There was an error and we could not insert your recipe data.", })
        }
    }

}