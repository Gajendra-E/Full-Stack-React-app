import { LOGIN_SUCCESS,  ALERT_DETAIL,FETCH_SITE_VISIT_REQUESTS } from "../actions/actionTypes"

const initialstate = {
    user: {},
    users: null,
    openAlert: false,
    alertSeverity: null,
    alertMessage: null,
    user_site_visit_requests:null
   
}
export default function userReducer(state = initialstate, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.data
            }
        case FETCH_SITE_VISIT_REQUESTS:
            return {
                ...state,
                user_site_visit_requests: action.data
            }
           
       
        case ALERT_DETAIL:
            return {
                ...state,
                openAlert: action.data,
                alertSeverity: action.severity,
                alertMessage: action.message,
            }

        default:
            return state;
    }
}