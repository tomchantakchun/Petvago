const initialState = {
    startDate: '',
    endDate: '',
    district: '',
    petType:''
};

const reducer = ( state = initialState, action ) => {
    // eslint-disable-next-line default-case
    switch ( action.type ) {
        case SEARCH:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }

    }
    return state;
};

export default reducer;