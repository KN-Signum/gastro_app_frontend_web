import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalHomePage from './pages/GlobalHomePage';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Routes>
          <Route path="/" element={<GlobalHomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
