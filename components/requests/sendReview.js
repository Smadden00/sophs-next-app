import SendReviewSafetyChecks from "../safetyChecks/sendReviewSafetyChecks";

export default async function SendReview(router, restaurantName, overallRating, price, taste, experience, description, state, city, cities) {
        try {
            const safetyResponse = SendReviewSafetyChecks(restaurantName, overallRating, price, taste, experience, description, city, cities);
            if (safetyResponse != "No errors"){
                throw new Error(safetyResponse);
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
                    city: city,
                    state_code: state,
                    soph_submitted: false
                })
            });
            if (!response.ok) {
                console.log("in send review error")
                throw new Error('Could not make put request.');
            }

            //if there are no errors, send the user back to the reviews page
            router.push('/reviews');
        } catch (error) {
            console.error('Error sending the new review:', error);    
        }
    };