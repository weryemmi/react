import { Route, Routes } from 'react-router-dom';

import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Write from './components/write';
import Header from './components/header';
import PostItem from './components/postItem';
import Category from './components/category';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/write' element={<Write />}/>
      <Route path='/post/:id' element={<PostItem />}/>
      <Route path='/category' element={<Category />}/>
    </Routes>
    </div>
  );
}

export default App;
