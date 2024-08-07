import { Route, Routes, useLocation } from 'react-router-dom';
import React, { useLayoutEffect } from 'react';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import StartStreamingPage from '../Pages/StartStreamingPage';
import ViewStreamsPage from '../Pages/ViewStreamsPage';
import SignupPage from '../Pages/SignupPage';
import ProfilePage from '../Pages/ProfilePage';
import ProtectedDataPage from '../Pages/ProtectedDataPage'; 
import MainLayout from './MainLayout';
import StreamViewer from '../Pages/StreamViewer';

const AllRoutes = () => {
    const location = useLocation();
  
    useLayoutEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

    return(
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/start-stream" element={<StartStreamingPage />} />
            <Route path="/view-streams" element={<ViewStreamsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/protected" element={<ProtectedDataPage />} /> 
            <Route path="/stream/:streamId" element={<StreamViewer />} />
          </Routes>
        </MainLayout>
    );
};

export default AllRoutes;
