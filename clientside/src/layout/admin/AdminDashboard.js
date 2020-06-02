import React from 'react';
import { Button } from 'reactstrap';
import AdminNavbar from '../../components/AdminNavbar';

export default function AdminDashboard(props) {
  console.log('See => Admin Dashboard!!');
  return (
    <div>
      <nav>
        <AdminNavbar />
      </nav>
      <div className='container text-center mt-4'>
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
}
