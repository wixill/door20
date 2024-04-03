import { useState, useEffect } from "react";

function AboutPage({ onPageLoad }) {

  useEffect(() => {
    onPageLoad();
  }, []);

  return <div>Welcome to the About Page!</div>;
}

export default AboutPage;