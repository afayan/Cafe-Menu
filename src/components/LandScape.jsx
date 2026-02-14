import React from "react";
import { menuData } from "../../data/data";
import "../App.css";
import { useState, useEffect, useMemo } from "react";

const AUTO_TIME = 5000;
const LARGE_THRESHOLD = 8; // if items > 8 => large

const LandScape = () => {
  const [current, setCurrent] = useState(0);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  // Orientation detection
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reorder categories (large ones to end)
  const orderedCategories = useMemo(() => {
    const small = [];
    const large = [];

    menuData.categories.forEach((cat) => {
      if (cat.items.length > LARGE_THRESHOLD) {
        large.push(cat);
      } else {
        small.push(cat);
      }
    });

    return [...small, ...large];
  }, []);

  // Build sections
  const sections = useMemo(() => {
    const result = [];

    if (isPortrait) {
      // 3 per page unless large
      for (let i = 0; i < orderedCategories.length; i++) {
        const cat = orderedCategories[i];

        if (cat.items.length > LARGE_THRESHOLD) {
          result.push([cat]);
        } else {
          const group = orderedCategories
            .slice(i, i + 3)
            .filter(c => c.items.length <= LARGE_THRESHOLD);

          if (group.length) {
            result.push(group);
          }

          i += group.length - 1;
        }
      }
    } else {
      // Landscape & square → 1 per page
      orderedCategories.forEach((cat) => {
        result.push([cat]);
      });
    }

    return result;
  }, [orderedCategories, isPortrait]);

  // Auto horizontal scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === sections.length - 1 ? 0 : prev + 1
      );
    }, AUTO_TIME);

    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className="slider-container">

        <div className="topheader">
        <img className="logo" src="/logo.png" alt="Cafe logo" />
        <h1 className="title">MENU</h1>
      </div>
      <div
        className="slider"
        style={{
          transform: `translateX(-${current * 100}vw)`
        }}
      >
        {sections.map((section, index) => (
          <div key={index} className="section">
            {section.map((category) => (
              <div key={category.id} className="category">
                <h2>{category.name}</h2>

                <div
                  className="items"
                  style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(${
                      category.items.length > 8 ? 100 : 150
                    }px, 1fr))`
                  }}
                >
                  {category.items.map((item) => (
                    <div key={item.id} className="item">


                        
                      <img
                        src={`${item.image}?w=400&h=400&fit=crop&q=70&auto=format`}
                        alt={item.name}
                      />
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandScape;