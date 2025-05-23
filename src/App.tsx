import './App.css'
import Cursos from './pages/Cursos';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pessoas from './pages/Pessoas';
import Layout from './components/Layout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/cursos" element={<Cursos/>}/>
          <Route path="/pessoas" element={<Pessoas/>}/>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={2500} />
    </Router>
    </>
  )
}

export default App
