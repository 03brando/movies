import React from 'react';

import Header from '../Header/Header';

//TODO: add header and footer, addition pages

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
