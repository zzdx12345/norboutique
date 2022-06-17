import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from '../Views/Home/Home'
import About from '../Views/About/About'
import Detail from '../Views/Detail/Detail'



export default function Router() {

  return (
    <HashRouter>
        <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/detail/:id' component={Detail}/>
            <Redirect from='/' to='/home'/>
        </Switch>
    </HashRouter>    
  )
}
