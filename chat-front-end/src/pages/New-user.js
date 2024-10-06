import { useNavigate } from 'react-router-dom';

 function NewUser(){
    const navigate = useNavigate();
    return (
    <section>
            <h1>New User page</h1>
            <button className="btn-primary" onClick={() => navigate(-1)}>
            Go Back
            </button>
            <button className="btn-primary" onClick={() => navigate('/new-user-form')}>
            New User login
            </button>
    </section>  
)
}


      
      
export default NewUser;