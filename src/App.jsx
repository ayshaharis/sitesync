
import './App.css'
import ReactDOM from 'react-dom/client';
import {lazy,Suspense} from 'react'
import { BrowserRouter as Router,Route, Routes, Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashBoard from './components/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Banner from './components/Banner';
import { AuthProvider } from './context/Authcontext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';

//lazyloading
const SiteDetails=lazy(()=>import('./components/SiteDetails/SiteDetails.jsx'))
const About=lazy(()=>import('./components/About.jsx'))
const AppLayout=()=>{
  return (
    <div className='app-layout'>
     <Navbar/>
     <Suspense fallback={<div>Loading...</div>}>
     <Outlet/>
     </Suspense>
     <Footer/>
    </div>
  );

};

const appRouter = createBrowserRouter([
   { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
        { path: "/", element: <LandingPage/> },
         { path: "/about", element: <About/> },

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
         { path: "about", element: <About /> },
     

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
