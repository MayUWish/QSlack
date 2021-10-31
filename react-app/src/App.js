import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import LeftBar from './components/LeftBar/LeftBar';
import HomePage from './components/HomePage';
import { authenticate } from './store/session';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      
      <Switch>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}

        <Route path='/' exact={true} >
          <NavBar page={'home'}/>
          <HomePage />
        </Route>

        <ProtectedRoute path='/clients/:clientName' exact={true} >
          <NavBar page={'app'}/>
          <LeftBar />          
        </ProtectedRoute>
        
        <Route path="*">
          <NavBar page={'home'}/>
          <HomePage />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
