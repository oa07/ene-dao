import React from 'react';
import NavBar from '../components/NavBar';

export default function Homepage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <section className='homepage'>
        <div className='homepage_heading text-center pt-3'>
          <h1> Homepage </h1>
        </div>
      </section>
    </div>
  );
}
