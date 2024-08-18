import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Outlet/>
      </main>
      
    </div>
  );
}

export default App;