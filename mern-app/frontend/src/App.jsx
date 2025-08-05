// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import AuthGate from '../gates/AuthGate.jsx';
// import InverseAuthGate from '../gates/InverseAuthGate.jsx';
// import EmailVerificationGate from '../gates/EmailVerificationGate.jsx';
// import InverseEmailGate from '../gates/InverseEmailGate.jsx';
// import ProfileCompletionGate from '../gates/ProfileCompletionGate.jsx';
// import InverseProfileGate from '../gates/InverseProfileGate.jsx';
// import AdminGate from '../gates/AdminGate.jsx';

// import Layout from './components/Layout.jsx';
// import LayoutNoNav from './components/LayoutNoNav.jsx';
// import './App.css'

// import LoginPage from "./pages/LoginPage.jsx";
// import Home from "./pages/Home.jsx";
// import CreateProfile from "./pages/CreateProfile.jsx";
// import Register from './pages/Register.jsx';
// import ManageEvents from './pages/ManageEvents.jsx';
// import VolunteerMatch from './pages/VolunteerMatch.jsx';
// import EmailVerification from './pages/EmailVerification.jsx';
// import ManageProfile from './pages/ManageProfile.jsx';
// //import AuthGate from '../gates/AuthGate.jsx';

// function App() {
//   return (
//       <Router>
//         <Routes>
//           {/* Public Routes when logged OUT */}
//           <Route element={<InverseAuthGate/>}>
//             <Route element={<LayoutNoNav/>}>
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<Register />} />
//             </Route>
//           </Route>
//           {/* Authenicated but unverfied */}
//           <Route element={<AuthGate/>}>
//             <Route element={<InverseEmailGate/>}>
//               <Route element={<LayoutNoNav/>}>
//                 <Route path="/emailverification" element={<EmailVerification/>}/>
//               </Route>
//             </Route>
//           </Route>
//           {/* Authenticated and Verified but profile incomplete */}
//           <Route element={<AuthGate/>}>
//             <Route element={<EmailVerificationGate/>}>
//               <Route element={<InverseProfileGate/>}>
//                 <Route element={<LayoutNoNav/>}>
//                   <Route path="/createprofile" element={<CreateProfile />}/>
//                 </Route>
//               </Route>
//             </Route>
//           </Route>
//           {/* Fully authenticated user */}
//           <Route element={<AuthGate/>}>
//             <Route element={<EmailVerificationGate/>}>
//               <Route element={<ProfileCompletionGate/>}>
//                 <Route path="/" element={<Layout />}>
//                   <Route index element={<Home />} />
//                   <Route path="/home" element={<Home />} />
//                   <Route path='/manageprofile' element={<ManageProfile/>} />
//                 </Route>
//               </Route>
//             </Route>
//           </Route>
//           {/* Full authenticated ADMIN */}
//           <Route element={<AuthGate/>}>
//             <Route element={<EmailVerificationGate/>}>
//               <Route element={<ProfileCompletionGate/>}>
//                 <Route element={<AdminGate/>}>
//                   <Route path="/" element={<Layout/>}>
//                     <Route path="/manageevents" element={<ManageEvents />} />
//                     <Route path="/volunteermatch/:eventId" element={<VolunteerMatch />} />
//                   </Route>
//                 </Route>
//               </Route>
//             </Route>
//           </Route>
//         </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGate from '../gates/AuthGate.jsx';
import InverseAuthGate from '../gates/InverseAuthGate.jsx';
import EmailVerificationGate from '../gates/EmailVerificationGate.jsx';
import InverseEmailGate from '../gates/InverseEmailGate.jsx';
import ProfileCompletionGate from '../gates/ProfileCompletionGate.jsx';
import InverseProfileGate from '../gates/InverseProfileGate.jsx';
import AdminGate from '../gates/AdminGate.jsx';

import Layout from './components/Layout.jsx';
import LayoutNoNav from './components/LayoutNoNav.jsx';
import LayoutLogout from './components/LayoutLogout.jsx';
import './App.css';

import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import CreateProfile from "./pages/CreateProfile.jsx";
import Register from './pages/Register.jsx';
import ManageEvents from './pages/ManageEvents.jsx';
import VolunteerMatch from './pages/VolunteerMatch.jsx';
import EmailVerification from './pages/EmailVerification.jsx';
import ManageProfile from './pages/ManageProfile.jsx';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes for Unauthenticated Users */}
        <Route element={<InverseAuthGate />}>
          <Route element={<LayoutNoNav />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Email Verification Required */}
        <Route element={<AuthGate />}>
          <Route element={<InverseEmailGate />}>
            <Route element={<LayoutLogout />}>
              <Route path="/emailverification" element={<EmailVerification />} />
            </Route>
          </Route>
        </Route>

        {/* Profile Completion Required */}
        <Route element={<AuthGate />}>
          <Route element={<EmailVerificationGate />}>
            <Route element={<InverseProfileGate />}>
              <Route element={<LayoutLogout />}>
                <Route path="/createprofile" element={<CreateProfile />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Fully Authenticated and Complete Users */}
        <Route element={<AuthGate />}>
          <Route element={<EmailVerificationGate />}>
            <Route element={<ProfileCompletionGate />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/manageprofile" element={<ManageProfile />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Admin-Only Routes */}
        <Route element={<AuthGate />}>
          <Route element={<EmailVerificationGate />}>
            <Route element={<ProfileCompletionGate />}>
              <Route element={<AdminGate />}>
                <Route path="/" element={<Layout />}>
                  <Route path="/manageevents" element={<ManageEvents />} />
                  <Route path="/volunteermatch/:eventId" element={<VolunteerMatch />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Optional: Debug Reset Route (for testing) */}
        <Route path="/reset" element={
          <div className="p-6 text-center">
            <h2 className="text-2xl mb-4">Reset Session</h2>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/register";
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Clear LocalStorage & Go to Register
            </button>
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;
