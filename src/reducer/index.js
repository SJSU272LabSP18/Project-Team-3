import {CREATE_SESSION,UPDATE_BOOKING} from "../actions/index";


const initialState = {
  guest : true,
  userLoggedIn : false,
  user : { firstname:'' } ,
  booking : {}
};

const USER = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_SESSION :
            
            var guest= true , logged = false;

            if(action.logged === true) {
                logged = true;
                guest = false;
            } 

           return { guest: guest , userLoggedIn: logged, user:action.user , booking : {}};

           break;

        case UPDATE_BOOKING :   

            return { guest: state.guest , userLoggedIn: state.userLoggedIn, user:state.user , booking : action.booking};
      
        default :
            return state;

    }

};

export default USER;