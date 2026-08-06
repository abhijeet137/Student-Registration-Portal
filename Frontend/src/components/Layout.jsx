import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="d-lg-none bg-primary text-white d-flex justify-content-between align-items-center px-3 py-2 shadow">
        <h5 className="mb-0">🎓 Student Portal</h5>

        <button
          className="btn btn-light"
          onClick={() => setShowSidebar(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Offcanvas */}
      <div
        className={`offcanvas offcanvas-start ${
          showSidebar ? "show" : ""
        }`}
        style={{
          visibility: showSidebar ? "visible" : "hidden",
        }}
      >
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title">
            🎓 Student Portal
          </h5>

          <button
            className="btn-close btn-close-white"
            onClick={() => setShowSidebar(false)}
          ></button>
        </div>

        <div className="offcanvas-body p-0">
          <Sidebar closeSidebar={() => setShowSidebar(false)} />
        </div>
      </div>

      {/* Backdrop */}
      {showSidebar && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      <div className="container-fluid">
        <div className="row">

          {/* Desktop Sidebar */}
          <div className="col-lg-3 col-xl-2 d-none d-lg-block p-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div
            className="col-12 col-lg-9 col-xl-10 p-4"
            style={{
              background: "#f8f9fa",
              minHeight: "100vh",
            }}
          >
            {children}
          </div>

        </div>
      </div>
    </>
  );
}

export default Layout;