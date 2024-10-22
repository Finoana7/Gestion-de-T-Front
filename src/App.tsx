import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Protected from './components/Protected'
import Home from './pages/Home'

function App() {

  return (
    <div className='flex w-screen h-screen overflow-y-auto' id='wrapper'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Protected><Home /></Protected>} />
      </Routes>
    </div>
  )
}

export default App
