import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-lg-3 col-xl-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div
          className="col-lg-9 col-xl-10 p-4"
          style={{
            background: "#f8f9fa",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;