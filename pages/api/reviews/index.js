/*
This function will handle the get all reviews and put review
*/
import pool from "../../../backend-utils";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const client = await pool.connect()
            const data = await client.query('SELECT * FROM reviews;');
            res.status(200).json({ body: data });
        } catch {
            console.log('catching error');
            res.status(500).json({message: "There was an error and we could not complete your request."});
        }
    } else if (method == "PUT"){
        try{
            const {rest_name, o_rating, price, taste, experience, description} = JSON.parse(req.body);
            const response = await pool.query(`INSERT INTO reviews(rest_name, o_rating, price, taste, experience, description, user_id_submitted, soph_submitted) VALUES ('${rest_name}', ${o_rating}, ${price}, ${taste}, ${experience}, '${description}', '1', FALSE);`);
            res.status(200).json({message: response, body: req.body})
        } catch {
            res.status(500).json({message: "There was an error and we could not insert your data.", })
        }
    }

}