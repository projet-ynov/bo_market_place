import { useState } from "react";
import './connexion.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [emailExist, setEmailExist] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const navigate = useNavigate();

  // @ts-ignore
  const handleSubmit = async (event) => {
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
        sessionStorage.setItem('id', JSON.stringify(token));
        console.log(token);
      });
      navigate("/");
    }
    catch (e) {
      // @ts-ignore
      if (e.response.request.response.includes("email")) {
        setEmailExist(true)
      }
    }
  };

  const handleForgotPassword = () => {
    console.log("Redirection vers la page de réinitialisation de mot de passe");
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
              {emailExist ? <p>Mauvais mail ou mot de passe</p> : ""}
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
              <input type="checkbox" id="rememberMe" className="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} />
              <label className="labelRemember" htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
            <div className="forgetDiv">
              <p className="p-forget"><a className='forget' href="#" onClick={handleForgotPassword}>Mot de passe oublié ?</a></p>
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
