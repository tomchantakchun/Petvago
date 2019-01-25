import * as actionTypes from '../actions';

const initialState = {
    startDate: '',
    endDate: '',
    district: '',
    petType: '',
    searchResult: ''
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
        let resultStore = Object.keys(action.result).map(i =>action.result[i])
            return {
                ...state,
                searchResult: resultStore
            }

        default:
            return state;
    }

};

export default reducer;