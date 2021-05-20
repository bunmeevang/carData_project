import {Datacontext} from "../App"
import {useState, useContext, useEffect} from "react"
import UserRecipes from "../components/UserRecipes"
import UsersInformations from "../components/UsersInformations"
import {Link} from "react-router-dom"

export default function UsersPage () {
    const {isLoggedIn, setIsLoggedIn} = useContext(Datacontext)
    const [userInfo, setUserInfo] = useState({})


	const getYourData = async () => {
		try {
			const response = await fetch(
			`http://localhost:9000/users/${window.localStorage.getItem(
				"username"
			)}`,
			{
				method: "GET",
				headers: {
				"Content-Type": "application/json",
				// Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			);
			const data = await response.json();
            setUserInfo(data)
            console.log(data.recipes)
			// setTheUserName(window.localStorage.getItem("username"))
			// setUserData(data)
			// console.log(window.localStorage)
            console.log(userInfo)
		} catch(err) {
			console.log(err)
		}
	}

    useEffect(()=> {
        getYourData()
        // console.log(userInfo)
    }, [])
    return (
        <div>
            {
                isLoggedIn?
                    <div>
                        <UsersInformations userInfo={userInfo} />
                        <UserRecipes userInfo={userInfo} />
                    </div>
                :
                    <div>
                        Login to view your saved recipes.
                        <Link to="/login">Login</Link>
                    </div>
            }
        </div>
    )

}