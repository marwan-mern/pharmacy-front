import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Store from './components/Store';
import Gain from './components/Gain';
import AddToStock from './components/AddToStock';
import Report from './components/Report';
import AddProduct from './components/AddProduct';




function App() {
  return (
    <div className="App">
            <img className='coverImg' alt='Cover' src='./assets/Cover.jpg' />
      <BrowserRouter>
        <Navbar />
        <Gain/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/store" exact element={<Store/>} />
          <Route path="/AddToStock" exact element={<AddToStock/>} />
          <Route path="/report" exact element={<Report/>} />
          <Route path="/AddProduct" exact element={<AddProduct/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
