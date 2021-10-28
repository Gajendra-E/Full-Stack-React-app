import api from '../api';
import { LOGIN_SUCCESS, LOGOUT,FETCH_SITE_VISIT_REQUESTS } from "../../src/actions/actionTypes"

export function fetchAllSiteVisitRequest() {
    return function (dispatch) {
        api.get('site-vist-request').then((response) => {

            if (response.status === "success") {
                dispatch({
                    type: FETCH_SITE_VISIT_REQUESTS,
                    data: response.payload
                });
            }
        });
    }
}

export function createUserVistRequest(self, item) {
    return dispatch => {
        api.post('site-vist-request', item).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllSiteVisitRequest())
                self.setState({
                    dialogOpen: false,
                    id: null,
                    name: "",
                    name_error: false,
                    comapny_name: "",
                    company_name_error: false,
                    visit_date: null,
                    visit_date_error: false,
                    visit_time: null,
                    visit_date_error: false,
                    status:"PENDING"
                    // mode: ""
                })
            }
            else {
                alert(response.status)
            }

        })
    }
}

export function updateUserVistRequest(self, item, id) {
    return dispatch => {
        api.put('site-vist-request/' + id, item).then((response) => {
            if (response.status === "success") {
                dispatch(fetchAllSiteVisitRequest());
            }
            self.setState({
                dialogOpen: false,
                    id: null,
                    name: "",
                    name_error: false,
                    comapny_name: "",
                    company_name_error: false,
                    visit_date: null,
                    visit_date_error: false,
                    visit_time: null,
                    visit_date_error: false,
                    status:"PENDING"
                //mode: ""
            })
        })
    }
}

export function postLogin(self) {

    let item = {}
    item.email = self.state.email;
    item.password = self.state.password;
    return dispatch => {
        api.post('users/login', item).then((response) => {
            if (response.status === "success") {
                dispatch({
                    type: LOGIN_SUCCESS,
                    data: response.payload
                })
                localStorage.setItem('token', JSON.stringify(response.token));
                localStorage.setItem('user', JSON.stringify(response.payload));
                switch (response.payload.user_type) {
                    case "ADM":
                        self.props.history.push("/admin/user-request");
                        break;
                    case "USR":
                        self.props.history.push("/user/user-request");
                        break;
                    default:
                        self.props.history.push("/");
                        break;
                }
            }
            else {
                alert("Invalid User")
            }
        })
    }
}

export function logout(self) {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location = "/";
    }
}