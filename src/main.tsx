import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'animate.css';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
