import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LayoutNoNav from './components/LayoutNoNav.jsx';
import './App.css'
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import Register from './pages/Register.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
//import VolunteerHistory from './pages/VolunteerHistory.jsx';
import VolunteerMatch from './pages/VolunteerMatch.jsx';
import Test from './pages/Test.jsx';
import EmailVerification from './pages/EmailVerification.jsx';

function App() {
  return (
      <Router>
        


        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/manageevents" element={<ManageEvents />} />
            { /* Turned into a pop-up window  <Route path="/volunteerhistory" element={<VolunteerHistory />} />*/}
            <Route path="/volunteermatch" element={<VolunteerMatch />} />
            <Route path='/test' element={<Test />}/>
          </Route>
          <Route element={<LayoutNoNav/>}>
            <Route path="/emailverification" element={<EmailVerification/>}/>
            <Route path="/createprofile" element={<CreateProfile />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App
