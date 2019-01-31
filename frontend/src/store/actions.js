export const SEARCHHOTEL = 'SEARCHHOTEL';
export const SEARCHRESULT = 'SEARCHRESULT';
export const SORTRESULT = 'SORTRESULT';
export const CHANGEDATE = 'CHANGEDATE';
export const CHANGEDISTRICT = 'CHANGEDISTRICT';
export const CHANGEPETTYPE = 'CHANGEPETTYPE';
export const CHANGEHOTELID = 'CHANGEHOTELID';



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

//login
export const login = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
  
}

// export const change_hotel_id = (data) =>{
//     return 
// }