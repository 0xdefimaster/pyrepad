import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Web3Provider } from './Web3Context';
import PyrePadLanding from './pyrepad-landing';
import PyrePadDashboard from './pyrepad-dashboard';
import LaunchesPage from './launches-page';
import CreateLaunchPage from './CreateLaunchPage';

function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PyrePadLanding />} />
          <Route path="/dashboard" element={<PyrePadDashboard />} />
          <Route path="/launches" element={<LaunchesPage />} />
          <Route path="/create" element={<CreateLaunchPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;