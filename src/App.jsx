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

  return isPortrait ? <Portrait /> : <LandScape />;
};

export default App;
