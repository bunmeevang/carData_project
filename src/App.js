import React, {useState, useEffect }from 'react';
// import CSVReader from 'react-csv-reader';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllData from './components/pages/AllData';
import PerformanceData from './components/pages/PerformanceData';
import CreateUser from './components/pages/CreateUser';
import UserProfile from './components/pages/UserProfile';
import Login from './components/pages/Login';

export const DataContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
		  setIsLoggedIn(true);
		}
	  }, []);

  return (
    <>
    <DataContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/alldata' component={AllData} />
          <Route path='/sign-up' component={CreateUser} />
          <Route path='/user' component={UserProfile} />
          <Route path='/login' component={Login} />
          <Route path='/performance-data' component={PerformanceData} />
        </Switch>
      </Router>
      </DataContext.Provider>
    </>
  );
}

export default App;
