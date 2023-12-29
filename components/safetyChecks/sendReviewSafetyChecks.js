import HasSingleQuote from "../functions/hasSingleQuote";

export default function SendReviewSafetyChecks(restaurantName, overallRating, price, taste, experience, description, city, cities) {
        //perform initial safety checks on the data that the client gave
        if( !cities.includes(city) ){
            return 'There is an error in the restaurant city. The city that is input is not in the list of cities.'
        }else if( restaurantName.trim() == '' ){
            return 'There is an error in the restaurant name. There must be a restaurant name.'
        }else if( !(overallRating >= 0 && overallRating <= 10) ){
            return 'There is an error in overall rating. The value must be between 0 and 10.'
        }else if( !(price >= 1 && price <= 4) ){
            return 'There is an error in price. The value must be between 1 and 4, inclusive.'
        }else if( !(taste >= 0 && taste <= 10)){
            return 'There is an error in taste. The value must be between 0 and 10.'
        }else if( !(experience >= 0 && experience <= 10) ){
            return 'There is an error in experience. The value must be between 0 and 10.'
        }else if( description.trim() == '' ){
            return 'There is an error in the description. You must input a value in description.'
        }else if( HasSingleQuote(restaurantName) ){
            return 'There is an error in the restaurant name. It cannot have any single quotes.'
        }else if( HasSingleQuote(description) ){
            return 'There is an error in the description. It cannot have any apostrophes or single quotes.'
        } else {
            return 'No errors'
        }
    };