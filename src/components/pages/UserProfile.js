import { useEffect, useState } from 'react';
import {useHistory, Link} from "react-router-dom"
import styles from "./UserProfile.module.css";

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
        <div className={styles.box}> 
        {information ?
            <div className={styles.border}>
                <div>
                    <button onClick={(e) => setEditInfo(!editInfo)}>{editInfo? "Cancel" : "Edit"}</button>
                    {editInfo ? <button onClick={deleteUser}>Delete Account</button> : ""} 
                </div>
                {
                    editInfo? 
                    <div className={styles.editPage}>
                        <form onSubmit={editUserProfile}>
                            User Name: <input className={styles.textBox} type="text" name="username" onChange={handleChange} defaultValue={information.username}  /> <br></br>
                            First Name: <input className={styles.textBox} type="text" name="firstName" onChange={handleChange} defaultValue={information.firstName}  /> <br></br>
                            Last Name: <input className={styles.textBox} type="text" name="lastName" onChange={handleChange} defaultValue={information.lastName}  /> <br></br>
                            <p className={styles.textBox}>About Me:</p><textarea name="bio" onChange={handleChange} defaultValue={information.bio} /><br></br> 
                            
                            <input type="submit" />
                        </form>
                    </div>
                    :
                    <div className={styles.profileBox}>
                        <p>User Name: {information.username}</p>
                        <p>First Name: {information.firstName}</p>
                        <p>Last Name: {information.lastName}</p>
                        <p>About Me: {information.bio}</p>
                    </div>
                }

            </div>
        :
        <h1><Link
            to='/sign-up'
            >Sign up to view Profile.</Link>
        </h1>}
        </div>
    )

    }
