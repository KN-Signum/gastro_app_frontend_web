import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PatientsPage from './pages/patient/PatientsPage';
import TestPage from './pages/TestPage';
import AssignPatientPage from './pages/patient/AssignPatientPage';
import GlobalHomePage from './pages/global-home/GlobalHomePage';
import CalendarPage from './pages/calendar/CalendarPage';
import { useEffect, useState } from 'react';
import { GastroappClient } from './api/gastroapp-client';
import DashboardPage from './pages/dashboard/DashboardPage';
import { useUserCtx } from './Providers/UserProvider';
import { userType } from './types/types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useUserCtx()
  

  useEffect(() => {
    let isMounted = true
    const fetchMe = async ()=>{
      const client = new GastroappClient();
      const response = await client.getMe();
      if(!response.success){
        return new Error("Cannot fetch data")
      }
      userCtx.setUser(response.data as userType)
      userCtx.setIsLoggedIn(true)
      setIsLoading(false)
    }
    fetchMe()
    return(()=>{
      isMounted = false
    })
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/" element={ userCtx.isLoggedIn ? <HomePage /> : <GlobalHomePage />}>
            <Route path="home" element={<HomePage />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="assign_patient" element={<AssignPatientPage />} />
            <Route path="calendar" element={<CalendarPage />} />
          </Route>
          <Route path="test" element={<TestPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
