import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LayoutNoNav from './components/LayoutNoNav.jsx';
import './App.css';
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import Register from './pages/Register.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
// import VolunteerHistory from './pages/VolunteerHistory.jsx';
import VolunteerMatch from './pages/VolunteerMatch.jsx';
import Test from './pages/Test.jsx';
import EmailVerification from './pages/EmailVerification.jsx';
import ManageProfile from './pages/ManageProfile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout with nav (protected) */}
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/manageevents" element={
            <ProtectedRoute>
              <ManageEvents />
            </ProtectedRoute>
          } />
          <Route path="/manageprofile" element={
            <ProtectedRoute>
              <ManageProfile />
            </ProtectedRoute>
          } />
          <Route path="/volunteermatch/:eventId" element={
            <ProtectedRoute>
              <VolunteerMatch />
            </ProtectedRoute>
          } />
          <Route path="/test" element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          } />
        </Route>

        {/* Routes without nav (public) */}
        <Route element={<LayoutNoNav />}>
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
