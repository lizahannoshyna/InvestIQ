import { Routes, Route } from 'react-router-dom';
import AuthPage from './Components/pages/AuthPage';
import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
}

export default App
