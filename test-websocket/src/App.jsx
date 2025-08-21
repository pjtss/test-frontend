import Dshelper from '@/components/Dshelper';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dshelper">dshelper</Link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Dshelper />} />    
          <Route path="/dshelper" element={<Dshelper />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
