import Layout from "../components/Layout";

function About() {
  return (
    <Layout>
      <div className="container">

        <div className="card shadow border-0">

          <div className="card-header bg-primary text-white">
            <h2>ℹ About Student Registration Portal</h2>
          </div>

          <div className="card-body">

            <h4 className="mb-3">🎓 Project Information</h4>

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <th>Project Name</th>
                  <td>Student Registration Portal</td>
                </tr>

                <tr>
                  <th>Version</th>
                  <td>1.0</td>
                </tr>

                <tr>
                  <th>Frontend</th>
                  <td>React.js + Bootstrap + Axios</td>
                </tr>

                <tr>
                  <th>Backend</th>
                  <td>Node.js + Express.js</td>
                </tr>

                <tr>
                  <th>Database</th>
                  <td>MongoDB Atlas</td>
                </tr>

                <tr>
                  <th>Authentication</th>
                  <td>JWT (JSON Web Token)</td>
                </tr>

                <tr>
                  <th>Deployment</th>
                  <td>Frontend - Vercel | Backend - Render</td>
                </tr>

                <tr>
                  <th>Developer</th>
                  <td>Abhijeet</td>
                </tr>

              </tbody>

            </table>

            <div className="alert alert-info mt-4">

              <h5>📖 About the Project</h5>

              <p className="mb-0">
                The Student Registration Portal is a full-stack web
                application that allows administrators to manage
                student records while enabling students to securely
                view and update their own profiles. The project uses
                React.js for the frontend, Express.js for the backend,
                MongoDB Atlas as the database, and JWT for secure
                authentication.
              </p>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default About;