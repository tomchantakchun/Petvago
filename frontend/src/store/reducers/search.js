import * as actionTypes from '../actions';
import moment from 'moment'


let today = new Date().toISOString().split('T')[0];

const initialState = {
    startDate: moment(new Date(today)).format("YYYY-MM-DD"),
    endDate: moment(new Date(today)).format("YYYY-MM-DD"),
    district: '',
    petType: '',
    sortPeference: "NameAscending",
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
            let resultStore = Object.keys(action.result).map(i => action.result[i])
            return {
                ...state,
                searchResult: resultStore
            }

        case actionTypes.SORTRESULT:
            return {
                ...state,
                sortPeference: action.sort
            }

        default:
            return state;
    }

};

export default reducer;