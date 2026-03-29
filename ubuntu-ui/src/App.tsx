
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
import UserDashboard from './features/user/pages/UserDashboard';
import UserDocumentsPage from './features/user/pages/UserDocumentsPage';
import UploadDocumentPage from './features/provider/pages/UploadDocumentPage';
import UserProvidersPage from './features/user/pages/UserProvidersPage';
import UserProfilePage from './features/user/pages/UserProfilePage';
import ViewDocumentPage from './features/user/pages/ViewDocumentPage';
import ProviderDashboard from './features/provider/pages/ProviderDashboard';
import ProviderUsersPage from './features/provider/pages/ProviderUsersPage';
import ProviderUserDetailsPage from './features/provider/pages/ProviderUserDetailsPage';
import ProviderDocumentsPage from './features/provider/pages/ProviderDocumentsPage';
import ProviderProfilePage from './features/provider/pages/ProviderProfilePage';
import ProviderDetailsPage from './features/user/pages/ProviderDetailsPage';

/* Temporary test pages */
const LandingPage = () => <div>Landing Page</div>;
const LoginPage = () => <div>Login Page</div>;


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
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
          <Route path="documents" element={<UserDocumentsPage />} />
          <Route path="providers" element={<UserProvidersPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="documents/:id" element={<ViewDocumentPage />} />
          <Route path="providers/:id" element={<ProviderDetailsPage />} />
        </Route>

        
        <Route path="/provider" element={<ProviderShellLayout />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="upload" element={<UploadDocumentPage />} />
          <Route path="users" element={<ProviderUsersPage />} />
          <Route path="users/:id" element={<ProviderUserDetailsPage />} />
          <Route path="documents" element={<ProviderDocumentsPage />} />
           <Route path="profile" element={<ProviderProfilePage />} />
        </Route>

       
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}