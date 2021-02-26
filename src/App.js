import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages/Pages';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
