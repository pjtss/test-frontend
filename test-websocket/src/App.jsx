import Dshelper from '@/components/Dshelper';
import InquiryList from '@/components/admin/InquiryList';
import AdminReservations from '@/services/PersonalReservationService.jsx';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dshelper">dshelper</Link>
        <Link to="/admin/inquiry">Inquiry List</Link>
        <Link to="/admin/reservations">Reservations</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Dshelper />} />    
          <Route path="/dshelper" element={<Dshelper />} />
          <Route path="/admin/inquiry" element={<InquiryList />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
