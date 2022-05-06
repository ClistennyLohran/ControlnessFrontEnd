import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Graficos from './pages/Graficos';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/usuarios" element={<Graficos/>}></Route>
        <Route path="/graficos" element={<Usuarios/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;