import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PerformanceCard from './performancecard';
import { useAuth } from '../Context/authContext';
import { Navbar } from '../Component/Navbar';
import { Footer } from '../Component/footer';




const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {LoggedIn}=useAuth();
  const studentId=LoggedIn.studentId;
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`http://localhost:4500/student/${studentId}`, { headers });
        setPerformanceData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <Navbar/>
      {performanceData ? (
        <PerformanceCard performanceData={performanceData} />
      ) : (
        <div>No performance data available for this student.</div>
      )}
      <Footer/>
    </div>
  );
};

export default PerformancePage;
