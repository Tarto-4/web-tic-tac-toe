import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OnePlayer from './components/Oneplayer/Game';
import MultiplePlayers from './components/Multiple/Multipleplayers/Multipleplayers';
import './App.css'
import Home from './components/Home';

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/playwithcomputer" element={<OnePlayer />} />
        <Route path="/multipleplayers" element={<MultiplePlayers />} />
      </Routes>
    </Router>
    </div>
  );
  
}

export default App;