import React, { useState } from 'react';

export default function CreateUser(props) {
	const [showPW, setShowPW] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
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
        } catch (error) {
            console.error(error);
        }
    }
	const handleChange = (e) => {
		setUserInfo({...userInfo, [e.target.name]: e.target.value})
		console.log(userInfo)
	}

	return (
		<div className="newUser">
			<h1>The {props.page} page</h1>
			<form onSubmit={e => {createNewUser(e)}}>
				<h2>Sign Up</h2>
				<span>Username: </span>
				<input
					name="username"
					onChange={ handleChange
					}
					type="text"
					placeholder="username"
				/>
				<br />
				<span>Password: </span>
				<input
					name="password"
					onChange={handleChange
					}
					type={showPW ? 'text' : 'password'}
					placeholder="password"
				/>
				<p onClick={() => setShowPW(!showPW)}>Show Password</p>
				<br />
				<input type="submit" />
			</form>
		</div>
	);
}
