import * as actionTypes from '../actions';

const initialState = {
    hotelId : 0,
}

const reducer  = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.CHANGEHOTELID:
            console.log('change hotel id')
            return {
                ...state,
                hotelId: action.hotelId,
            }
        default:
            return state;
    }

};

export default reducer;