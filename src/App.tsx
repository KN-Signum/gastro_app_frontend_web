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
/**
 * ==========================
 * Main Application Component 
 * ==========================
 * contains routing and login logic.
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = new GastroappClient();
    client
      .getMe()
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage isLoggedIn={isLoggedIn} />
              ) : (
                <GlobalHomePage isLoggedIn={isLoggedIn} />
              )
            }
          >
            <Route path="home" element={<HomePage isLoggedIn={isLoggedIn} />} />
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
