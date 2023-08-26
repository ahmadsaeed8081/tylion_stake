import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../store/reducers/globalReducer";

import { CloseIcon } from "../../assets/Icons";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.globalReducer);

  const navBarItems = [
    { lbl: "Home", slug: "/", subMenu: [] },
    {
      lbl: "Staking",
      slug: "/",
      subMenu: [],
    },
    { lbl: "Dao (Coming Soon)", slug: "/", subMenu: [] },
    {
      lbl: "Knowledge",
      slug: "/",
      subMenu: [
        { id: "whitepaper", title: "Whitepaper" },
        { id: "about", title: "About" },
        { id: "roadmap", title: "Roadmap" },
        { id: "faq", title: "FAQ" },
      ],
    },
  ];

  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleMenuMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMenuMouseLeave = () => {
    setMenuVisible(false);
  };

  const handleMenuItemClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", () => {
      document.body.style.overflowY = "auto";
      dispatch(setOpenSidebar(false));
    });
  }, []);

  return (
    <div
      className={`sidebar-s fixed rel anim ${openSidebar ? "show" : "hide"}`}
    >
      <div
        className={`side-block flex col anim ${openSidebar ? "show" : "hide"}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="hdr flex items-center justify-end">
          <div className="hdr-tag"></div>
          <div
            className="icon-close flex aic jc"
            onClick={(e) => {
              dispatch(setOpenSidebar(false));
            }}
          >
            <CloseIcon />
          </div>
        </div>
        <div>
          <div className="items flex aic flex-col">
            <div
              className={`list-item flex relative`}
              onClick={(e) => {
                dispatch(setOpenSidebar(false));
              }}
            >
              <div
                className="li cfff font"
                onClick={() => {
                  handleMenuItemClick("home");
                  dispatch(setOpenSidebar(false));
                }}
              >
                Home
              </div>
            </div>
            <div
              className={`list-item flex relative`}
              onClick={(e) => {
                dispatch(setOpenSidebar(false));
              }}
            >
              <div className="li cfff font">Staking</div>
            </div>
            <div
              className={`list-item flex relative`}
              onClick={(e) => {
                dispatch(setOpenSidebar(false));
              }}
            >
              <div className="li cfff font">Dao (Coming Soon)</div>
            </div>
            <div className={`list-item flex relative`}>
              <>
                <div
                  className="li cfff font"
                  onMouseEnter={() => setMenuVisible(true)}
                  onMouseLeave={() => setMenuVisible(false)}
                >
                  Knowledge
                </div>{" "}
                {isMenuVisible && (
                  <div
                    className="sub-menu flex flex-col"
                    onMouseEnter={handleMenuMouseEnter}
                    onMouseLeave={handleMenuMouseLeave}
                    onClick={(e) => {
                      dispatch(setOpenSidebar(false));
                    }}
                  >
                    <a
                      href="https://www.plutus.exchange/whitepaper"
                      target="_blank"
                      className="sub-menu-item"
                    >
                      Whitepaper
                    </a>
                    <div className="sub-menu-item">GitBook</div>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
