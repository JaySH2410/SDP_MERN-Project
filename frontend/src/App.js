import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Navigation from './Components/Shared/Navigation/Navigation';
import Authenticate from './Pages/Authenticate/Authenticate';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useReducer } from 'react';
const isAuth = true;
const user = {
  activated:false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <GuestRoute path="/" exact>
          <Home/>
        </GuestRoute>
        {/* <Route path="/register" exact>
          <Register/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>*/}
        <GuestRoute path="/authenticate"> 
          <Authenticate/>
        </GuestRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({children, ...rest}) => {
  return(
    <Route
      {...rest}
      render = {({location}) => {
        return isAuth?(
        <Redirect
          to={{
            pathname: '/rooms',
            state: {from: location},
          }}
        />
        ) : (
          children
        );
      }}
    >
    </Route>
  )
}

const SemiProtectedRoute = ({children, ...rest}) => {
  return(
    <Route
      {...rest}
      render = {({location})=>{
        return !isAuth?(
          <Redirect
            to={{
              path: '/',
              state: {from:location},
            }}
          />
        ) : isAuth && !user.activated?(
          children
        ):         
        <Redirect
          to={{
            pathname: '/rooms',
            state: {from: location},
          }}
        />
      }
      }
    />
  )
}

export default App;
