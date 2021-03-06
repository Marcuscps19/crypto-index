import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './contexts/RequireAuth'
import { MessageProvider } from './contexts/Message'
import Login from './pages/Login';
import Home from './pages/Home';
import UpdatePrice from './pages/UpdatePrice';
import { BrowserRouter as Router } from 'react-router-dom'
import './reset.css'
import './styles.css'
import NotFound from './pages/NotFound';

// Source Routes Authentication https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f
function App() {

  return (
    <Router>
      <Routes>
        <Route path='*' element={<NotFound />} />
          <Route 
            path="/"
            element={
            <RequireAuth redirectTo="/login">
              <MessageProvider>
                  <Home />
              </MessageProvider>
            </RequireAuth>
          } 
          >
          </Route>
          <Route
          path="/update-price"
          element={
            <RequireAuth redirectTo="/login">
              <MessageProvider>
                <UpdatePrice />
              </MessageProvider>
            </RequireAuth>
          }
          ></Route>
          <Route
            path="/login"
            element= {
              <Login />
            }
          >
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
