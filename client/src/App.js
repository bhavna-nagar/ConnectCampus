import { useState } from 'react';
import {Box} from '@mui/material';
import './App.css';
import Login from './componenets/account/Login';
import DataProvider from './context/DataProvider';
import Home from './componenets/home/Home';
import Header from './componenets/header/Header';
import CreatePost from './componenets/create/CreatePost';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import DetailView from './componenets/details/DetailView';
import Update from './componenets/create/Update';
import Follow from './componenets/home/post/Follow';
import UnFollow from './componenets/home/post/UnFollow';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider> 
     <BrowserRouter>
      <Box style={{ marginTop: 64 }} className="App">
       <Routes>
            <Route path='/account' element={<Login  isUserAuthenticated={isUserAuthenticated} />} />
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreatePost />} />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView />} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update />} />
            </Route>
            <Route path='/follow' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/follow' element={<Follow />} />
            </Route>
            <Route path='/unfollow' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/unfollow' element={<UnFollow />} />
            </Route>
       </Routes>
      </Box>
  </BrowserRouter>
     </DataProvider>
  );
}

export default App;
