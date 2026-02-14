import React, { useEffect, useMemo, useRef, useState } from "react";
import { menuData } from "../../data/data";
import "../styles/Portrait.css";

const AUTO_TIME = 5000;
const LARGE_THRESHOLD = 10;

function Portrait() {
  const containerRef = useRef(null);

  /* ---------------------------------------
     1️⃣  Responsive MAX ITEMS PER PAGE
  --------------------------------------- */
  const [maxItemsPerPage, setMaxItemsPerPage] = useState(20);

  useEffect(() => {
    const calculateMaxItems = () => {
      const width = window.innerWidth;

      if (width > 900) {
        setMaxItemsPerPage(30); // large screen
      } else if (width > 600) {
        setMaxItemsPerPage(20); // medium screen
      } else {
        setMaxItemsPerPage(12); // small screen
      }
    };

    calculateMaxItems();
    window.addEventListener("resize", calculateMaxItems);
    return () => window.removeEventListener("resize", calculateMaxItems);
  }, []);

  /* ---------------------------------------
     2️⃣  Reorder Categories (Large at End)
  --------------------------------------- */
  const orderedCategories = useMemo(() => {
    const normal = [];
    const large = [];

    menuData.categories.forEach((cat) => {
      if (cat.items.length > LARGE_THRESHOLD) {
        large.push(cat);
      } else {
        normal.push(cat);
      }
    });

    return [...normal, ...large];
  }, []);

  /* ---------------------------------------
     3️⃣  Smart Packing Based On Item Count
  --------------------------------------- */
  const pages = useMemo(() => {
    const result = [];
    let currentPage = [];
    let currentItemCount = 0;

    orderedCategories.forEach((cat) => {
      const itemCount = cat.items.length;

      // Large category takes full page
      if (itemCount > LARGE_THRESHOLD) {
        if (currentPage.length) {
          result.push(currentPage);
          currentPage = [];
          currentItemCount = 0;
        }
        result.push([cat]);
        return;
      }

      // If adding category exceeds max items → new page
      if (currentItemCount + itemCount > maxItemsPerPage) {
        if (currentPage.length) {
          result.push(currentPage);
        }
        currentPage = [cat];
        currentItemCount = itemCount;
      } else {
        currentPage.push(cat);
        currentItemCount += itemCount;
      }
    });

    if (currentPage.length) result.push(currentPage);

    return result;
  }, [orderedCategories, maxItemsPerPage]);

  /* ---------------------------------------
     Auto Scroll
  --------------------------------------- */
  useEffect(() => {
    // if (import.meta.env.DEV) return;
    

    const container = containerRef.current;
    if (!container || pages.length <= 1) return;

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % pages.length;

      container.scrollTo({
        left: container.clientWidth * index,
        behavior: "smooth",
      });
    }, AUTO_TIME);

    return () => clearInterval(interval);
  }, [pages.length]);


  return (
    <div className="menuRoot">
      <div className="topheader">
        <img className="logo" src="/logo.png" alt="Cafe logo" />
        <h1 className="title">MENU</h1>
      </div>

      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflow: "hidden",
          width: "100vw",
        }}
      >
        {pages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            style={{
              minWidth: "100vw",
              padding: "0 0 20px",
            }}
          >
            <div className="itemscontainer">
              {page.map((cat, catIndex) => (

                <section key={cat.id} className={`category ${catIndex % 2 === 0 ? "darkbg" : ""}`}>
                  <h2 className="categoryTitle">{cat.name}</h2>

                  <div className="grid">
                    {cat.items.map((item) => (
                      <span key={item.id}>
                        <div className="card">
                          <span className="pricecontainer">
                            <p>small</p>
                            <div className="pricetag">
                              {item.sizes?.small}
                            </div>
                          </span>

                          <img
                            className="img"
                            src={item.image}
                            alt={item.name}
                          />

                          <span className="pricecontainer">
                            <p>large</p>
                            <div className="pricetag">
                              {item.sizes?.large}
                            </div>
                          </span>
                        </div>

                        <p className="itemname">{item.name}</p>
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portrait;
