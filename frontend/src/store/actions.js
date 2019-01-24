export const SEARCHHOTEL = 'SEARCHHOTEL';


//hotel

export const choose_hotel_to_book = (data) => {
    return {
        type: "CHOOSE_HOTEL_TO_BOOK",
        payload: data
    }
  
}