import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Core Pages
import TemplateSelection from './pages/Templates/TemplateSelection';
import CreateEvent from './pages/Events/CreateEvent';
import ManageEvents from './pages/Events/ManageEvents';

// Static Demo Pages
import ClassicEvent from './pages/Events/ClassicEvent';
import ModernEvent from './pages/Events/ModernEvent';

// Dynamic Event Layouts
import EventRouter from './pages/Events/EventRouter';

const AuthWrapper = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Checking session...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected Routes */}
          <Route
            path="/manage-events"
            element={
              <AuthWrapper>
                <ManageEvents />
              </AuthWrapper>
            }
          />

          <Route
            path="/templates"
            element={
              <AuthWrapper>
                <TemplateSelection />
              </AuthWrapper>
            }
          />

          <Route
            path="/create-event"
            element={
              <AuthWrapper>
                <CreateEvent />
              </AuthWrapper>
            }
          />

          {/* Static Demo Event Layouts */}
          <Route
            path="/events/ClassicEvent"
            element={
              <AuthWrapper>
                <ClassicEvent />
              </AuthWrapper>
            }
          />
          <Route
            path="/events/ModernEvent"
            element={
              <AuthWrapper>
                <ModernEvent />
              </AuthWrapper>
            }
          />

          {/* Dynamic Event Layout Renderer */}
          <Route
            path="/event/:eventId"
            element={
              <AuthWrapper>
                <EventRouter />
              </AuthWrapper>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
