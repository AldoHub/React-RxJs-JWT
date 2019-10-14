import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("access-token")));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
}


function login(email, password){

    let user = {
        email,
        password
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch("http://localhost:8000/api/auth/login", options)
    .then(handleResponse)
    .then(user => {
        localStorage.setItem("access-token", JSON.stringify(user));
        currentUserSubject.next(user);

        return user;
    })
}



function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access-token');
    currentUserSubject.next(null);
}


function handleResponse(response) {
  
    return response.text().then(text => {
        let data = "";
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }else{
          
            data = text && JSON.parse(text);
            return data;
        }

       
    });

}
