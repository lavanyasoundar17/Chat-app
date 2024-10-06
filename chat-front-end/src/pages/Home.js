import { useNavigate } from "react-router-dom";

function Home () {
  const navigate = useNavigate();
    return (
        <section className= "welcome-page">
          <h1>Welcome to Chat App</h1>
          <section className="welcome-page-buttons">
            <button className="btn-primary" onClick={() => navigate('new-user')}>New User</button>
            <button className="btn-primary" onClick={() => navigate('existing-user')}>Existing User</button>
          </section>
            {/* <Link to="/new-user">New User</Link>
            <Outlet /> */}
        </section>
        
      );
}

export default Home;