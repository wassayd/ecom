import React, { useState } from 'react'
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import './App.css'
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Routing from './routing/router';
import { isConnected } from './services/user/auth';
import PrivateRoute from './routing/privateRoute'

export const AuthContext = React.createContext({
  isConnected: false,
  setConnected: value => { }
})

function App() {

  const [auth, setAuth] = useState(isConnected())
  const contexValue = {
    isConnected: auth,
    setConnected: setAuth
  }
  
  return (
    <>
      <AuthContext.Provider value={contexValue}>
        <Router>
          <Header/>
          <main className="container">
            <Switch>
              {Routing.map(({url,component, secured}, key) => {
                  const MyComponent = component;
                  if(secured){
                      return (
                        <PrivateRoute path={url} key={key}>
                          <MyComponent/>
                        </PrivateRoute>
                    )
                  }
                  
                  return <Route path={url} key={key} component={component}/>
                })}
            </Switch>
          </main>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App
