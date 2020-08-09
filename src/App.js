import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Dashboard from "./Components/Dashboard";
import configureStore from "./store";

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Dashboard/>
        </div>
      </Provider>
  );
}

export default App;
