import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Wrapper = ({ children }) => {
  const { openSidebar } = useSelector((state) => state.globalReducer);

  return (
    <div className={`dashboard-page flex flex-col`}>
      <Sidebar />
      <div className="pages-block flex flex-col relative h-full">
        <Header />
        <section>{children}</section>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
export default Wrapper;
