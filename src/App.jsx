import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import Main from './pages/main'
import PlayerContextProvider from './context/PlayerContext'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main/*'element={<PlayerContextProvider><Main /></PlayerContextProvider>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
