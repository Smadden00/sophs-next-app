/*
This function will handle the get review request
*/
import pool from "../../../backend-utils";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const { id } = req.query;
            const data = await pool.query(`SELECT * FROM recipes WHERE recipe_id=${id};`);  
            res.status(200).json({ body: data.rows });
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the recipe and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the recipe request wasnt GET');
    }

}