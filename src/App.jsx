
import './App.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Route, Routes, Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashBoard from './components/Dashboard'
import Navbar from './components/Navbar'
import SiteDetails from './components/SiteDetails/SiteDetails'
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Banner from './components/Banner';
import { AuthProvider } from './context/Authcontext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
const AppLayout=()=>{
  return (
    <div className='app-layout'>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </div>
  );

};

const appRouter = createBrowserRouter([
   { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
        { path: "/", element: <LandingPage/> },

  {
    path: "/",
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    children: [
      { path: "/home",
         element:
          <HomePage />
         },
     

      {
        path: "/site/:id",
        element: (
        
            <SiteDetails />
          
        ),
      },

      {
        path: "/upcomingprojects",
        element: <div>all upcoming projects here</div>,
      },
    ],
  },
]);



function App(){
  return <RouterProvider router={appRouter}/>
}

export default App;
