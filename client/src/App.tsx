// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import CreateDeal from './pages/CreateDeal';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   
        <Route path="/create-deal" element={<CreateDeal />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default App;
