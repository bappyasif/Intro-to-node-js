import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import MainNavigation from './components/MainNavigation';
import LoginForm from './components/routes/LoginForm';
import RegisterUser from './components/routes/RegisterUser';

const contexts = {
  baseUrl: "http://localhost:3000/"
}

export const AppContexts = createContext()

function App() {
  return (
    <AppContexts.Provider value={contexts}>
      <BrowserRouter>
        <div className="App">
          <MainNavigation />
          <Routes>
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<RegisterUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContexts.Provider>
  );
}

export default App;
