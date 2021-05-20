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
		setUserInfo({
			username: username,
    		password: password,
			bio: "empty",
			cars: []
		})
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
            setUserInfo({
				username: "",
				password: "",
				bio: "empty",
				cars: []
			});
        } catch (error) {
            console.error(error);
        }
    }
	const handleChange = () => {

	}

	return (
		<div className="newUser">
			<h1>This is the {props.page} page</h1>
			<form onSubmit={e => {createNewUser(e)}}>
				<h2>Sign Up</h2>
				<span>Username: </span>
				<input
					onChange={e => {
						setUsername(e.target.value);
					}}
					type="text"
					placeholder="username"
				/>
				<br />
				<span>Password: </span>
				<input
					onChange={e => {
						setPassword(e.target.value);
					}}
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
