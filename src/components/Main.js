import React, {useEffect, useState} from "react";
//import img from "../2539422.svg";
import { authenticationService } from "../auth/auth";
import { authHeader } from "../auth/_headers";


const Main = (props) => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 
  useEffect(() => {
  
    if(!authenticationService.currentUserValue){
      props.history.push("/login")
    }
   
  });

  const addPost = async(e) =>{
    e.preventDefault();
   
    let post = {
        title,
        content, 
    }

    const headers = await authHeader(); 

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(post)
    }

    console.log(post);
    return fetch("http://localhost:8000/post/createPost", options)
    .then(response => {
      console.log(response);
    })
  }

    return(
        <React.Fragment>
           <header>
             <div>
                <h1>React <br/> JWT Auth</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum, ex et elementum ornare, neque quam tempus mi, sed mollis mi nibh lacinia erat</p>
             </div>
           
           </header>
    
        <div>
        
         <form onSubmit={addPost}>
                        <p>Create a new post</p>
                        
                        <label htmlFor="title">Post Title: </label>
                        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                        
                        <label htmlFor="content">Post Content: </label>
                        <textarea name="content"  onChange={(e) => setContent(e.target.value)}  ></textarea>
                    
                        <input type="submit" value="create post" />
                    </form>
        </div>
    
        </React.Fragment>
    )

}

export default Main;