export const TOPBAR = 'topbar';
export const FOOTER = 'footer';
export const LOGINPAGE = 'loginpage';
const initialState={
    topbar:true,
    footer:true,
    Pages_login:false,
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.TOPBAR:
        return{
            ...state,
            top_bar:!state.topbar
        };
        case actionTypes.FOOTER:
        return{
            ...state,
            footer:!state.footer
        };
        case actionTypes.LOGINPAGE:
        return{
            ...state,
            Pages_login:!state.Pages_login
        };
        default :
        return state;
    }
}

export default reducer;