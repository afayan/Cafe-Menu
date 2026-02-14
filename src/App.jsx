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
<div className="addonsBar">
  <div className="col titleCol">ADD ONS</div>

  <div className="col">
    Nata <strong>₱5</strong><br />
    Crashed Oreo <strong>₱10</strong>
  </div>

  <div className="col">
    Coffee Jelly <strong>₱10</strong><br />
    Extra Coffee <strong>₱10</strong>
  </div>

  <div className="col rightCol">
    Upsize to Large <strong>+₱20</strong>
  </div>
</div>



  </>
  
};

export default App;
