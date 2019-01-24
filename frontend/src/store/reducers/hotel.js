

const initialState = {
    bookingStartDate: '',
    bookingEndDate: '',
    hotelChosenForBooking:1,
    expiryTime:null,
    bookingID:null,
    hotelName:null,
    roomType:null,
    roomTypeID:null,
    roomPrice:null
};

const reducer = ( state = initialState, action ) => {
    // eslint-disable-next-line default-case
    switch ( action.type ) {
        case 'CHOOSE_HOTEL_TO_BOOK':
            return {
                ...state,
                bookingStartDate: action.payload.bookingStartDate,
                bookingEndDate: action.payload.bookingEndDate,
                hotelChosenForBooking: action.payload.hotelID,
                expiryTime: action.payload.expiryTime,
                bookingID:action.payload.bookingID,
                hotelName:action.payload.hotelName,
                roomType: action.payload.roomType,
                roomTypeID: action.payload.roomTypeID,
                roomPrice: action.payload.roomPrice
            }
        default:
            return state;
    }
    
};

export default reducer;