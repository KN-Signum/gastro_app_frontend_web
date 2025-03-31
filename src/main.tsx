import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UserProvider from './Providers/UserProvider.tsx'
import PatientsProvider from './Providers/PatientsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <PatientsProvider>
        <App />
      </PatientsProvider>
    </UserProvider>
  </StrictMode>,
)
