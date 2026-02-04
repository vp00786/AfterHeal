import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import CaregiverDashboard from './pages/CaregiverDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import MyPatients from './pages/doctor/MyPatients';
import CreatePrescription from './pages/doctor/CreatePrescription';
import AdherenceReports from './pages/doctor/AdherenceReports';
import PatientTimeline from './pages/doctor/PatientTimeline';
import PatientChecklist from './pages/patient/PatientChecklist';
import DoctorChecklist from './pages/patient/DoctorChecklist'; // New
import PatientRecords from './pages/doctor/PatientRecords';
import CriticalAlerts from './pages/doctor/CriticalAlerts';
import AlertDetail from './pages/doctor/AlertDetail'; // New
import DoctorSettings from './pages/doctor/DoctorSettings';
// DoctorSettings is still imported just in case, but replaced in Quick Actions unless user clicks URL manually. 
// Actually I'll keep the route for settings too.

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'patient': return <PatientDashboard />;
    case 'doctor': return <DoctorDashboard />;
    case 'caregiver': return <CaregiverDashboard />;
    default: return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Doctor Module Routes */}
            <Route path="/doctor/patients" element={<MyPatients />} />
            <Route path="/doctor/prescriptions" element={<CreatePrescription />} />
            <Route path="/doctor/adherence" element={<AdherenceReports />} />
            <Route path="/doctor/adherence/:patientId" element={<PatientTimeline />} />
            <Route path="/doctor/records" element={<PatientRecords />} />
            <Route path="/doctor/alerts" element={<CriticalAlerts />} />
            <Route path="/doctor/alerts/:id" element={<AlertDetail />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />

            {/* Patient Routes */}
            <Route path="/patient/checklist" element={<PatientChecklist />} />
            <Route path="/patient/doctor/:doctorId" element={<DoctorChecklist />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
