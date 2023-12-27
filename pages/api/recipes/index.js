/*
This function will handle the get all recipes and put recipe calls
*/
import pool from "../../../backend-utils";

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
            const {recipe_name, ingredients, prep_time, rating, meal, instructions} = JSON.parse(req.body);
            const response = await pool.query(`INSERT INTO recipes(recipe_name, ingredients, prep_time, rating, meal, instructions, user_id_submitted) VALUES ('${recipe_name}', ${ingredients}, ${prep_time}, ${rating}, ${meal}, '${instructions}', '1');`);
            res.status(200).json({message: response, body: req.body})
        } catch {
            res.status(500).json({message: "There was an error and we could not insert your recipe data.", })
        }
    }

}