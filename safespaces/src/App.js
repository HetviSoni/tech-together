import Landing from './components/Landing';
import Feed from './components/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route exact path="/" caseSensitive={false} element={<Landing/>} />
        <Route path="/feed" caseSensitive={false} element={<Feed/>} />
      </Routes>
    </Router>
  );
}

export default App;
