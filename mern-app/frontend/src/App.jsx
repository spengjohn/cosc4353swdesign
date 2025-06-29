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
import Test from './pages/Test.jsx';
import cooglinklogo from "./assets/cooglinklogo.png"

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <nav className="p-4 bg-primary text-dark flex items-center justify-between">
          {/* Left: Logo */}
          <div>
            <img src={cooglinklogo} alt="Logo" className="h-20" />
          </div>
        {/* Right: Navigation Links */}
          <div className="space-x-4 font-semibold">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/createprofile">Create Profile</Link>
            <Link to="/manageevents">Manage Events</Link>
            <Link to="/volunteerhistory">Volunteer History</Link>
            <Link to="/volunteermatch">Volunteer Match</Link>
            <Link to="/test">Testing Page</Link>
          </div>
        </nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createprofile" element={<CreateProfile />}/>
          <Route path="/manageevents" element={<ManageEvents />} />
          <Route path="/volunteerhistory" element={<VolunteerHistory />} />
          <Route path="/volunteermatch" element={<VolunteerMatch />} />
          <Route path='/test' element={<Test />}/>
        </Routes>
    </Router>
  )
}

export default App
