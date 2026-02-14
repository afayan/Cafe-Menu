import React, { useEffect, useState } from "react";
import LandScape from "./components/LandScape";
import Portrait from "./components/Portrait";

const App = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>
  {isPortrait ? <Portrait /> : <LandScape />}

  <div className="footer">
  <div className="footer-left">
    <span className="footer-title">ADD ONS</span>
    <span>Nata <strong>₱5</strong></span>
    <span>Crushed Oreo <strong>₱10</strong></span>
  </div>

  <div className="footer-right">
    <span>Coffee Jelly <strong>₱10</strong></span>
    <span>Extra Coffee <strong>₱10</strong></span>
    <span>Upsize to Large <strong>+₱20</strong></span>
  </div>
</div>

  </>
  
};

export default App;
