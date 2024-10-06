import './App.css';
import {  Routes, Route  } from 'react-router-dom';

import NoPage from './pages/No-page';
import Home from './pages/Home';
import NewUser from './pages/New-user';
import ExistingUser from './pages/Existing-user';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="new-user" element={<NewUser/>} />
          <Route path="existing-user" element={<ExistingUser />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
  
}

export default App;
