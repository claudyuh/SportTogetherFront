import React, { useState } from 'react';
import './SideComponentToggler.css';

const SideComponentToggler = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
     
        <div className='sidebar' onClick={showSidebar}>
          {props.togglerButton}
        </div>
        <nav className={sidebar ? 'side-menu active' : 'side-menu'}>
          <div className='side-menu-items'>
            <div onClick={showSidebar}>
              {props.sidebarBody}
            </div>
          </div>
        </nav>
      
    </>
  );
}

export default SideComponentToggler;