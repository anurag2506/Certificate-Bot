import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chatbot from './Pages/chatbot';
import Certificate from './Pages/certificate';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,  // This makes Chatbot the default route
        element: <Chatbot />,
      },
      {
        path: "/certificate",
        element: <Certificate />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
