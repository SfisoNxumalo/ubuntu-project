
import './App.css'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "./app/layout/PublicLayout";
import UserShellLayout from "./app/layout/user/UserShellLayout";
import ProviderShellLayout from "./app/layout/provider/ProviderShellLayout";

/* Temporary test pages */
const LandingPage = () => <div>Landing Page</div>;
const LoginPage = () => <div>Login Page</div>;

const UserDashboard = () => <div>User Dashboard</div>;
const UserDocuments = () => <div>User Documents</div>;

const ProviderDashboard = () => <div>Provider Dashboard</div>;
const UploadPage = () => <div>Upload Document</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 PUBLIC */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />

        <Route
          path="/login"
          element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          }
        />

        
        <Route path="/user" element={<UserShellLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="documents" element={<UserDocuments />} />
        </Route>

        
        <Route path="/provider" element={<ProviderShellLayout />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>

       
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}