const initialState = {
   token:null
};

const reducer = ( state = initialState, action ) => {
    // eslint-disable-next-line default-case
    switch ( action.type ) {
        case 'LOGIN':
        console.log('login11111111',action.payload)
            return {
                ...state,
               token:action.payload
            }
        
        default:
            return state;
    }
    
};

export default reducer;