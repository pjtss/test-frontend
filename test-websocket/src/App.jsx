import WebSocketTest from './components/WebSocketTest';
import VideoPlayer from './components/HlsTest';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <h1>Home</h1>
      <nav>
        <link to="/">Home</link>
        <link to="/dshelper">Home</link>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<WebSocketTest />} />    
          <Route path="/dshelper" element={<VideoPlayer />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
