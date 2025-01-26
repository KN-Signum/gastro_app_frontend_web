import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalHomePage from './pages/global-home/GlobalHomePage';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PatientsPage from './pages/patient/PatientsPage';
import TestPage from './pages/TestPage';
import CalendarPage from './pages/calendar/CalendarPage';
import AssignPatientPage from './pages/patient/AssignPatientPage';
import DashboardPage from './pages/dashboard/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/" element={<GlobalHomePage />}>
            <Route path="home" element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="patients" element={<PatientsPage />} />
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
