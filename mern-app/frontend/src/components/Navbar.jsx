import { Link } from "react-router-dom";
import cooglinklogo from "../assets/cooglinklogo.png"

export default function Navbar() {
    return(
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
    );
}