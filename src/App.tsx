import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import History from './pages/history';
import HomePage from './pages/home';
import ScanPage from './pages/scan';

import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="flex h-dvh w-dvw justify-center bg-[linear-gradient(33deg,#004CAD_31.46%,#1166D5_91.7%)]">
          <div className="flex h-full w-full bg-white sm:max-w-[414px]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              fontSize: '14px',
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
