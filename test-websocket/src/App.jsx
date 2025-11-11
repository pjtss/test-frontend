import Dshelper from '@/components/Dshelper';
import InquiryList from '@/components/admin/InquiryList';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dshelper">dshelper</Link>
        <Link to="/admin/inquiry">Inquiry List</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Dshelper />} />    
          <Route path="/dshelper" element={<Dshelper />} />
          <Route path="/admin/inquiry" element={<InquiryList />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
