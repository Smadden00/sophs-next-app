/*
This function will handle the get review request
*/
import pool from "../../../backend-utils";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const { review_id } = req.query;
            const data = await pool.query(`SELECT * FROM reviews WHERE review_id=${review_id};`);  //not sure if this will work it may have to be an instance of pool? but i already made a pool on the reviews page so i think it should be fine
            res.status(200).json({ body: data.rows });
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the review and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the review request wasnt GET');
    }

}