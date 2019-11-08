import React from 'react';

import Navbar from './Navbar';

function Layout(props) { 
  // const children = props.children;

  return (
    <React.Fragment> {/* evita los div innecesarios */}
      <Navbar />
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
