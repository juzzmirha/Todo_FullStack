import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login_register/login'
import Home from './components/Home/home'
import Main from './components/Main/main'
import Register from './components/login_register/register'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
