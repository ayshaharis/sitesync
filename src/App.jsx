
import './App.css'
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom'

import DashBoard from './components/Dashboard'
import Navbar from './components/Navbar'
import SiteGrid from './components/SiteGrid'
import NewSiteForm from './components/NewSiteForm'
import SiteDetails from './components/SiteDetails'
function App() {

  return (
  
    <Router>
        <Navbar/>
         <h1 className="text-xl font-bold text-center my-4">
        SiteSync - Your Hassle-Free Site Management Partner
      </h1>
      <DashBoard/>
      <Routes>
        <Route path="/" element={<SiteGrid/>}/>
        <Route path="/site/:id" element={<SiteDetails/>}/>
      </Routes>
    </Router>
    
   
  )
}

export default App
