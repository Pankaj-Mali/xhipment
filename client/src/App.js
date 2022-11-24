import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Login></Login>}></Route>
      <Route path='/home' element={<Home></Home>} />
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
