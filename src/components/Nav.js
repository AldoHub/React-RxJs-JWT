import React, {useEffect, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { authenticationService } from "../auth/auth";

const Nav = (props) => {
  
  const [userState, setUserState] = useState(null);
  const [timer, setTimer] = useState(false);
  
  useEffect(() => {



    console.log(authenticationService.currentUserValue);
    if(authenticationService.currentUserValue){
      setUserState(authenticationService.currentUserValue);
    }
    setTimeout(() => setTimer(true), 500);

  })

  

  const logout = async() => {
    console.log("logout user");
    setUserState(null);
    authenticationService.logout();
    props.history.replace("/")
  }


  

  let buttons;
  if(timer){
      if(userState != null){
        buttons = (  
            <React.Fragment>
                <li><button className="logout" onClick={logout}>LogOut</button></li>
            </React.Fragment>)
    }else{
        buttons = (    
            <React.Fragment>
                <li><Link to="/login">logIn</Link></li>              
            </React.Fragment>)
    }
}
    return(
        <nav>
        <ul>
          <li><Link to="/"> ReactJWTAuth </Link></li>
         
        </ul>
        <ul>
        {buttons}
        </ul>
      </nav>
    )

}

export default withRouter(Nav);