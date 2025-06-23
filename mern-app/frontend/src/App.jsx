import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import Register from './pages/Register.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
import VolunteerHistory from './pages/VolunteerHistory.jsx';
import VolunteerMatch from './pages/VolunteerMatch.jsx';
import PrimaryButton from './components/Buttons'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <nav className="p-4 bg-primary text-dark">
          <Link className="mr-4" to="/">Home</Link>
          <Link className="mr-4" to="/login">Login</Link>
          <Link className="mr-4" to="/register">Register</Link>
          <Link className="mr-4" to="/createprofile">Create Profile</Link>
          <Link className="mr-4" to="/manageevents">Manage Events</Link>
          <Link className="mr-4" to="/volunteerhistory">Volunteer History</Link>
          <Link className="mr-4" to="/volunteermatch">Volunteer Match</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createprofile" element={<CreateProfile />}/>
          <Route path="/manageevents" element={<ManageEvents />} />
          <Route path="/volunteerhistory" element={<VolunteerHistory />} />
          <Route path="/volunteermatch" element={<VolunteerMatch />} />
        </Routes>
    </Router>

    
    /*
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>*/
  )
}

export default App
