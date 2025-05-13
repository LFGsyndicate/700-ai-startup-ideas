
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Render the app
createRoot(rootElement).render(<App />);
