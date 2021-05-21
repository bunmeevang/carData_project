import React, { useState, useContext} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {DataContext} from "../../App"

export default function Login(props) {
	const history = useHistory();
	const {isLoggedIn, setIsLoggedIn} = useContext(DataContext)
	const [showPW, setShowPW] = useState(false);
	const [notAccount, setNotAccount] = useState("")
	const [loginForm, setLoginForm] = useState({
		username: "",
		password: ""
	});

	const checkUser = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:9000/user")
			const data = await response.json();
			console.log(data)
			const theUser = data.filter(users => users.username === loginForm.username)
			console.log(theUser)
			theUser[0] ? handleLogin(e) : setNotAccount("Incorrect username or password.")

		} catch (error) {
			console.error(error);
		}
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:9000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ ...loginForm })
			});
			const data = await response.json();
			console.log(data)
			
			if (data.token) {
			window.localStorage.setItem("token", data.token);
			window.localStorage.setItem("username", data.username);
			window.localStorage.setItem("id", data.id)
			setIsLoggedIn(true);
			console.log(window.localStorage)
			history.push("/user")
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLoginChange = (e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
		console.log(loginForm)
	};

	return (
		<div className="Login">
			<h1>This is the {props.page} page</h1>
			<form onSubmit={checkUser}>
				<h2>Login</h2>
				<div>
				{notAccount}
				</div>
				<span>Username: </span>
				<input
					onChange={handleLoginChange}
					type="text"
					placeholder="username"
					name="username"
				/>
				<br />
				<span>Password: </span>
				<input
					onChange={handleLoginChange}
					type={showPW ? 'text' : 'password'}
					placeholder="password"
					name="password"
				/>
				<p onClick={() => setShowPW(!showPW)}>Show Password</p>
				<br />
				<input type="submit" />
			</form>
			<p>Don't have an account? </p>
			<Link to="/sign-up">Create new user?</Link>
		</div>
	);
}
