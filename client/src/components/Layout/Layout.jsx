import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
function Layout({ children, title, keywords, description, author }) {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ height: "80vh" }}>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  description: 'Best app for online shopping',
  keywords: 'electronic || books',
  author : 'Nishant',
  title: 'Ecommerce Website'
}
export default Layout;
