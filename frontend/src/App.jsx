import './App.css'
import {Routes, Route, BrowserRouter } from 'react-router-dom'
import PickupPage  from './pages/PickupPage'

/* import { useState, useEffect } from 'react'
import { getRequests, getSingleRequest, createRequest, updateRequest, deleteRequest } from './api' */

import './App.css'

function App() {

  return (
   <>
<BrowserRouter>
<Routes>
  <Route path='/' element ={<PickupPage/>}/>
</Routes>
</BrowserRouter>
   </>
  )
}

export default App
