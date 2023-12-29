import HasSingleQuote from "../functions/hasSingleQuote";

export default async function SendReview(router, restaurantName, overallRating, price, taste, experience, description) {
        try {
            //perform initial safety checks on the data that the client gave
            if(            
                restaurantName.trim() == '' &&
                !(overallRating >= 0 && overallRating <= 10) &&
                !(price >= 1 && price <= 4) &&
                !(taste >= 0 && taste <= 10) &&
                (!experience >= 0 && experience <= 10) &&
                description.trim() == '' &&
                HasSingleQuote(restaurantName) && 
                HasSingleQuote(description)
            ){
                throw new Error('There is an error in the data that you input.')
            }
            const response = await fetch('/api/reviews', {
                method: 'PUT',
                body: JSON.stringify({
                    rest_name: restaurantName,
                    o_rating: overallRating, 
                    price: price, 
                    taste: taste, 
                    experience: experience, 
                    description: description, 
                    user_id_submitted: 1, 
                    soph_submitted: false
                })
            });
            if (!response.ok) {
                throw new Error('Could not make put request.');
            }

            //if there are no errors, send the user back to the reviews page
            router.push('/reviews');
        } catch (error) {
            console.log('caught an error in the put request');
            console.error('Error sending the new review:', error);    
        }
    };