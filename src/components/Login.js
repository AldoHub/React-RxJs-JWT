import React , {useState} from "react";
import {Redirect} from "react-router-dom";

import { authenticationService } from "../auth/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
   


    const login = async(e) => {
        e.preventDefault()
        
        if(email !== "" && password !== ""){
            console.log("login user in");
            let auth = await authenticationService.login(email, password);
            console.log(auth);
            setRedirect(true);
        }else{
            console.log("need to fill the credentials")
        }
        
    } 

    const redirectTo = redirect;
    if(redirect){
        return <Redirect to="/" />  
    }


    return(
      
        <React.Fragment>
            <form onSubmit={login}>
            <p>Welcome back.</p>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login" />
            </form>
          
        </React.Fragment>
       
    )

}

export default Login;