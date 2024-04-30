import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Homepage from "./page/homepage";
import VideoUploadPage from "./page/upload";
import { useUser } from "@clerk/clerk-react";
import { Layout } from "antd";
import { Navigate } from "react-router-dom";
import HeaderComponent from "./components/header";
import MoviesSection from "./page/movies";

import "./App.css";

function App() {
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Layout>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upload" element={<VideoUploadPage />} />
            {/* <ProtectedRoute path="/upload" element={<VideoUploadPage />} /> */}
            <Route path="/" element={<ConditionalNavigate />} />
            <Route path="/movies" element={<MoviesSection />} />
            {/* <ProtectedRoute path="/upload" element={<VideoUploadPage />} /> */}
          </Routes>
        </Layout>
      </Router>
    </ClerkProvider>
  );
}

function ConditionalNavigate() {
  const { isSignedIn } = useUser();

  return isSignedIn ? <Navigate to="/upload" /> : <Navigate to="/login" />;
}

export default App;
