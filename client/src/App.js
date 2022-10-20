import React, { createContext } from 'react';
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
      <div className="App">
        <MainNavigation />
        <LoginForm />
      </div>
    </AppContexts.Provider>
  );
}

export default App;
