import * as actionTypes from '../actions';

const initialState = {
    startDate: '',
    endDate: '',
    district: '',
    petType: '',
    hotelChosenForBooking: 1,
    searchResult: []
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.SEARCHHOTEL:
        console.log(action.history)
            return {
                ...state,
                startDate: action.history.startDate,
                endDate: action.history.endDate,
                district: action.history.district,
                petType: action.history.petType
            }

        case actionTypes.SEARCHRESULT:
        console.log(action.result)
        console.log(typeof action.result)
        let resultStore = Object.keys(action.result).map(i =>action.result[i])
        console.log(resultStore)
        console.log(typeof resultStore)
            return {
                ...state,
                searchResult: resultStore
            }

        default:
            return state;
    }

};

export default reducer;