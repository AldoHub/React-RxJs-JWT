import { authenticationService } from '../auth/auth';

export function authHeader() {
    // return headers with authorization token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { 'Content-Type': 'application/json', Authorization: `Bearer ${currentUser.token}`};
    } else {
        return {'Content-Type': 'application/json'};
    }
}