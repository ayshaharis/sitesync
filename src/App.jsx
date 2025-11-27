
import './App.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Route, Routes, Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashBoard from './components/Dashboard'
import Navbar from './components/Navbar'
import SiteGrid from './components/SiteGrid'
import NewSiteForm from './components/NewSiteForm'
import SiteDetails from './components/SiteDetails/SiteDetails'
import Footer from './components/Footer';
import DailyUpdateModal from './components/SiteDetails/DailyUpdateModal';
import HomePage from './components/HomePage';
const AppLayout=()=>{
  return (
    <div className='app-layout'>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </div>
  );

};

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    errorElement:<Error/>,
    children:[{
      path:"/",
      element:<HomePage/>,
    },
  {
    path:"/site/:id",
    element:<SiteDetails/>
  },
   

{
  path:"/upcomingprojects",
  element:(
    <div>
      all upcoming projects here
    </div>
  )
},
]
  }
])


function App(){
  return <RouterProvider router={appRouter}/>
}

export default App;
