import { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom"

export default function UserProfile() {
    
    const [information, setInformation] = useState(null)
    const [editInfo, setEditInfo] = useState(false)
    const history = useHistory()
    
    const getUser = async () => {
        try {
          const response = await fetch(
            `http://localhost:9000/user/${window.localStorage.getItem(
              "username"
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          );
          const data = await response.json();
          console.log(data);
          setInformation(data)
        } catch (error) {
          console.error(error);
        }
      };

    const deleteUser = async (e) => {
        try {
            const response = await fetch(
            `http://localhost:9000/user/${information._id}`,
            {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            );
            const data = await response.json();
            console.log(data)
            history.push("/sign-up")
        } catch(err) {
            console.log(err)
        }
    }

    const editUserProfile = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(
            `http://localhost:9000/user/${information._id}`,
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                body: JSON.stringify(information)
            }
            );
            // const editInfo = res.json();
            console.log(information)
            setInformation(information)
            
        } catch (err){
            console.error(err)
        }
    }
    const handleChange = (e) => {
        setInformation({...information, [e.target.name]: e.target.value})
        console.log(information)
    }
    
    useEffect(() => {
        getUser()
    }, [])

    console.log('bun')
    return(
        <div> 
        {information ?
            <div>
                <div>
                    <button onClick={(e) => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit"}</button>
                    {editInfo ? <button onClick={deleteUser}>Delete Account</button> : ""} 
                </div>
                {
                    editInfo? 
                    <div>
                        <form onSubmit={editUserProfile}>
                            User Name: <input type="text" name="username" onChange={handleChange} defaultValue={information.username}  /> 
                            First Name: <input type="text" name="firstName" onChange={handleChange} defaultValue={information.firstName}  /> 
                            Last Name: <input type="text" name="lastName" onChange={handleChange} defaultValue={information.lastName}  /> 
                            <p>About Me:</p><textarea name="bio" onChange={handleChange} defaultValue={information.bio} /> 
                            
                            <input type="submit" />
                        </form>
                    </div>
                    :
                    <div>
                        <p>User Name: {information.username}</p>
                        <p>First Name: {information.firstName}</p>
                        <p>Last Name: {information.lastName}</p>
                        <p>About Me: {information.bio}</p>
                    </div>
                }

            </div>
        :
        <h1>Profile!</h1>}
        </div>
    )

    }
