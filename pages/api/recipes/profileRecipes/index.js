/*
This function will handle the get profile recipes request
*/
import pool from "../../../../backend-utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import Encrypt from "../../../../components/functions/encrypt";

export default async function handler(req, res){
    const method = req.method;
    if (method == "GET"){
        try{
            const session = await getServerSession(req, res, authOptions);
            if (!session) {
                return res.status(500).json({ message: 'The profile recipes request was unauthorized' });
            }

            const encrypted_identifier = Encrypt(session.user.email);


            //ensure the session identifier is the same as the identifier requested
            const data = await pool.query(`SELECT recipe_name, rating, user_encrypted, recipe_id FROM recipes WHERE user_encrypted='${encrypted_identifier}';`); 
            res.status(200).json({ body: data.rows });    
        } catch (error) {
            res.status(500).json({message: "There was an error while fetching the recipe and we could not complete your request. Error: "+ error});
        }
    } else {
        console.error('Error: the method of the recipe request wasnt GET');
    }

}