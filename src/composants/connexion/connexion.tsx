import { useState } from "react";
import './connexion.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [emailExist, setEmailExist] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setEmailExist(false)
    setEmail(email);
    setPassword(password);

    try {
      await axios.post('http://localhost:3000/admin/login', {
        mail: email,
        password: password
      }).then((response) => {
        const token = response.data.message;
        const admin = response.data.admin;
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('admin', JSON.stringify(admin));

      });
      navigate("/app/users");
    }
    catch (e:any) {
      if (e.response.request.response.includes("email")) {
        setEmailExist(true)
      }
    }
  };

  return (
    <>
      <div className="connexion">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputDiv">
            <div>
              <label className="labelRemember" htmlFor="email">Email :</label>
              <input type="email" id="email" value={email} required={true} onChange={(event) =>
                setEmail(event.target.value)
              } />
              {emailExist ? <p className='falseInput'>Mauvais mail ou mot de passe</p> : ""}
            </div>
            <div>
              <label className="labelRemember inputPadding" htmlFor="password">Mot de passe :</label>
              <input type="password" id="password" value={password} required={true} onChange={(event) =>
                setPassword(event.target.value)
              } />
            </div>
          </div>
          <div className="checkbox-forget">
            <div className="checkboxDiv">
            </div>
          </div>
          <div className="buttonDiv">
            <button className='buttonPadding button' type="submit">Connexion</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Connexion;
