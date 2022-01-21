import logo from './logo.svg';
import './App.css';
import ProdusList from './components/ProdusList';
import ProdusEdit from './components/ProdusEdit';
import Login from './components/Login';
import PrietenAdauga from './components/PrietenAdauga';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/ProdusList" element={<ProdusList/>}/>
          <Route path="/ProdusList/ProdusEdit" element={<ProdusEdit/>}/>
          <Route path="/ProdusEdit/:id" element={<ProdusEdit/>}/>
          <Route path="/ProdusClaim/:id/:idPrieten" element={<ProdusEdit/>}/>
          <Route path="/ProdusList/Prieten/:id" element={<PrietenAdauga/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;