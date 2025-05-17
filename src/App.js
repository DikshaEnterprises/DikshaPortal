import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portal from './Pages/Portal';
import Application from './Pages/Application';
import Contact from './Pages/Contact';
import LeadForm from './Pages/LeadForm';
import Navbar from './Pages/Navbar';
import ReferralPage from './Pages/Referral';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Portal/>} />
    < Route path="/application" element={<Application/>} />
          < Route path="/callback" element={<Contact/>} /> 
           < Route path="/product-contact" element={<LeadForm/>} /> 
           <Route path='/referral-claim' element={<ReferralPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
