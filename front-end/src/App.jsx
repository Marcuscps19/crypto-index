import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginProvider } from './contexts/Login';
import RequireAuth from './contexts/RequireAuth'
import Login from './pages/Login';
import Home from './pages/Home';
import UpdatePrice from './pages/UpdatePrice';
import {CurrenciesProvider} from './contexts/Currencies'

// Source Routes Authentication https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f
function App() {

  return (
    <Routes>
        <Route 
          path="/"
          element={
          <RequireAuth redirectTo="/login">
            <CurrenciesProvider>
              <Home />
            </CurrenciesProvider>
          </RequireAuth>
        } 
        >
        </Route>
        <Route
        path="/update-price"
        element={
          <RequireAuth redirectTo="/login">
            <CurrenciesProvider>
              <UpdatePrice />
            </CurrenciesProvider>
          </RequireAuth>
        }
        ></Route>
        <Route
          path="/login"
          element= {
          <LoginProvider>
            <Login />
          </LoginProvider>
          }
        >
        </Route>
    </Routes>
  );
}

export default App;
