import { useState } from 'react'

import './index.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={ <Dashboard/>} />
        <Route path="/sign-up" element={ <SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>}/>
     </Routes>
    </>
  )
}

export default App
