import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Admin from './containers/Admin/Admin';
import PageContent from './containers/PageContent/PageContent';

const App = () => {

  return (
    <>
      <header className='container '>
        <nav className='nav-link'>
          <ul className='d-flex justify-content-evenly'>
            <li><Link to='/pages/about'>About</Link></li>
            <li><Link to='/pages/cardsPages'>CardsPages</Link></li>
            <li><Link to='/pages/contacts'>Contacts</Link></li>
            <li><Link to='/pages/division'>Division</Link></li>
            <li><Link to='/pages/slides'>Slides</Link></li>
            <li><Link to='/pages/admin'>Admin</Link></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/pages/admin' element={<Admin />} />
        <Route path="/pages/:pageName" element={<PageContent />} />
      </Routes>
    </>
  );
};

export default App;
