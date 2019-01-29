export const SEARCHHOTEL = 'SEARCHHOTEL';
export const SEARCHRESULT = 'SEARCHRESULT';
export const SORTRESULT = 'SORTRESULT';


//hotel

export const choose_hotel_to_book = (data) => {
    return {
        type: "CHOOSE_HOTEL_TO_BOOK",
        payload: data
    }
  
}

export const redirect_to_confirmation = (data) => {
    return {
        type: "REDIRECT_TO_CONFIRMATION",
        payload: data
    }
}
