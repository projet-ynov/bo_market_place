import { SetStateAction, useState } from "react";
import './connexion.css'
import { useNavigate } from "react-router-dom";
import { login } from "../../services/req";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => setEmail(event.target.value);
  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => setPassword(event.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  const handleConnexion = () => {
    
    login(email, password)
    navigate('/');
  };
  

  const handleForgotPassword = () => {
    console.log("Redirection vers la page de réinitialisation de mot de passe");
  };

  return (
    <>
      <div className="connexion">
        <h1>Connexion</h1>
        <form>
          <div className="inputDiv">
            <div>
              <label className="labelRemember" htmlFor="email">Email :</label>
              <input type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label className="labelRemember inputPadding" htmlFor="password">Mot de passe :</label>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} />
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
            <button className='buttonPadding button' type="button" onClick={handleConnexion}>Connexion</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Connexion;
