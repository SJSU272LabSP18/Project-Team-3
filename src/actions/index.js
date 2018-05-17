export const CREATE_SESSION = 'CREATE_SESSION';
export const UPDATE_BOOKING = 'UPDATE_BOOKING';
export const LOGOUT_USER = 'LOGOUT_USER';

 
export function manageSession(logged,user) {
    return {
        type : CREATE_SESSION,
        logged,
        user                         
    }
}


export function updateBooking(booking) {
    return {
        type : UPDATE_BOOKING,
        booking                      
    }
}
