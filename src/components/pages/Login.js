import React, { useState, useContext} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {DataContext} from "../../App"
import styles from "./Login.module.css";

export default function Login(props) {
	const history = useHistory();
	const {isLoggedIn, setIsLoggedIn} = useContext(DataContext)
	const [showPassword, setShowPassword] = useState(false);
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
		<div className={styles.body}>
			<div className={styles.border}>
			<form onSubmit={checkUser}>
			<div className={styles.innerBox}>
				<h2 className={styles.login}>Sign In</h2>
				<div>
				{notAccount}
				</div>
				<input className={styles.input}
					onChange={handleLoginChange}
					type="text"
					placeholder="username"
					name="username"
					/>
				<br />
				<input className={styles.input}
					onChange={handleLoginChange}
					type={showPassword ? 'text' : 'password'}
					placeholder="password"
					name="password"
					/>
				<br />
				<input type="submit" />
				</div>
			</form>
			<p>Need to make an account? </p>
			<Link to="/sign-up">Sign up!</Link>
		</div>
		</div>
	);
}
