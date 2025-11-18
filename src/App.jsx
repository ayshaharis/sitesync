
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
      element:(
        <>
        <h1  className="text-xl font-bold text-center my-4">SiteSync - Your Hassle-Free Site Management Partner</h1>
        <DashBoard/>
        <SiteGrid/>
    
        </>
      ),
    },
  {
    path:"/site/:id",
    element:<SiteDetails/>
  },
   
{
  path:"/payments",
  element:(
    <div>
      all payment infos here
    </div>
  )
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
