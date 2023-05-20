import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {ShoppingList} from './ShoppingList';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h3 className="d-flex justify-content-center m-3">
          Shopping list react front-end
        </h3>

        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item- m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Homepage
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/shoppinglist">
                Shopping list
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/shoppinglist' element={<ShoppingList />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
