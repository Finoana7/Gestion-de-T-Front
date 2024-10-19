import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './components/Protected'

function App() {

  return (
    <div className='w-screen h-screen overflow-y-auto' id='wrapper'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/*' element={<Protected><Home /></Protected>} /> */}
      </Routes>
    </div>
  )
}

export default App
