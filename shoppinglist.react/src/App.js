import './App.css';
import {ShoppingList} from './ShoppingList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<ShoppingList />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
