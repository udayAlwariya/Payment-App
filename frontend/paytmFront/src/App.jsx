import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Dashboard } from './components/Dashboard'
import { Send } from './components/Send'
import { Home } from './Home'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/signin' element = {<Signin/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
      <Route path='/send' element = {<Send/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
