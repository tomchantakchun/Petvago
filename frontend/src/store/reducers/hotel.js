

const initialState = {
    bookingStartDate: '',
    bookingEndDate: '',
    hotelChosenForBooking:null,
    expiryTime:null,
    bookingID:null,
    hotelName:null,
    roomType:null,
    roomTypeID:null,
    roomPrice:null,
    vaccineRequirement:null,
    ownerName:null,
    ownerPhone:null,
    petName: null,
    petType: null,
    petWeight: null,
    service: null,
    totalPrice: null,
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
                roomPrice: action.payload.roomPrice,
                vaccineRequirement: action.payload.vaccineRequirement
            }
        case 'REDIRECT_TO_CONFIRMATION':
            return{
                ...state,
                ownerName:action.payload.ownerName,
                ownerPhone:action.payload.ownerPhone,
                petName: action.payload.petName,
                petType: action.payload.petTyle,
                petWeight: action.payload.petWeight,
                service: action.payload.service,
                totalPrice: action.payload.totalPrice,
            }
        default:
            return state;
    }
    
};

export default reducer;