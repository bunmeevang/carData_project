import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import styles from "./Login.module.css";

export default function CreateUser(props) {
	const history = useHistory();
	const [showPassword, setShowPassword] = useState(false);
	// const [username, setUsername] = useState('');
	// const [password, setPassword] = useState('');
	const [userInfo, setUserInfo] = useState(
		{
			username: "",
			password: "",
			bio: "empty",
			cars: []
		}
	)

	const createNewUser = async (e) => {
        e.preventDefault();
		console.log(userInfo);
        try {
            const response = await fetch(
                `http://localhost:9000/register`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
                }
            );
            const data = await response.json();
            console.log(userInfo)
            console.log(data)
			history.push("/login")
        } catch (error) {
            console.error(error);
        }
    }
	const handleChange = (e) => {
		setUserInfo({...userInfo, [e.target.name]: e.target.value})
		console.log(userInfo)
	}

	return (
		<div className={styles.body}>
			<div className={styles.border}>
			<form onSubmit={e => {createNewUser(e)}}>
			<div className={styles.innerBox}>
				<h2>Sign Up</h2>
				<input className={styles.input}
					name="username"
					onChange={ handleChange
					}
					type="text"
					placeholder="username"
				/>
				<br />
				<input className={styles.input}
					name="password"
					onChange={handleChange
					}
					type={showPassword ? 'text' : 'password'}
					placeholder="password"
				/>
				<br />
				<input type="submit" />
				</div>
			</form>
		</div>
		</div>
	);
}
