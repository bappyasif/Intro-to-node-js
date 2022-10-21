import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import MainNavigation from './components/MainNavigation';
import LoginForm from './components/routes/LoginForm';

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
          </Routes>
        </div>
      </BrowserRouter>
    </AppContexts.Provider>
  );
}

export default App;
