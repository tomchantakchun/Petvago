import * as actionTypes from '../actions';
import moment from 'moment'


const initialState = {
    startDate: moment(new Date()).format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
    district: 'all',
    petType: 'all',
    sortPeference: "NameAscending",
    searchResult: ''
};

const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case actionTypes.SEARCHHOTEL:
        console.log('search hotel')
            return {
                ...state,
                startDate: action.history.startDate,
                endDate: action.history.endDate,
                district: action.history.district,
                petType: action.history.petType
            }

        case actionTypes.CHANGEDATE:
        return {
            ...state,
            startDate: action.date.startDate,
            endDate: action.date.endDate,
        }

        
        case actionTypes.CHANGEDISTRICT:
        console.log(action)
        return {
            ...state,
            district: action.district.district,
        }

        case actionTypes.CHANGEPETTYPE:
        return {
            ...state,
            petType: action.petType.petType,
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