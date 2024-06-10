import React, { Fragment, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/common/TopHeader";
import Footer from "../components/common/Footer";
import Sidebar from "../components/admin/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/common/Loader";

const AdminLayout = () => {
  let [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      <div className={`${toggle ? "" : "toggled"} page-wrapper doctris-theme`}>
        <Sidebar manuClass="sidebar-wrapper" />
        <main className="page-content bg-light">
          <TopHeader toggle={toggle} setToggle={setToggle} />
          <div className="container-fluid">
            <div className="layout-specing">
              <Suspense fallback={<Loader />}>{<Outlet />}</Suspense>
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            closeOnClick
          />
          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default AdminLayout;
