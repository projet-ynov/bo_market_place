import { Dialog } from '@mui/material';
import { useRef, useState } from 'react';
import './edition.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
function PopupEdition({ userId }) {
    const [open, setOpen] = useState(false);

    const [userData, setUserData] = useState<UserModel>();
    const [mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [photo, setProfilePhoto] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const DEFAULT_IMAGE_URL = './../../../public/icon-user.png';

    // @ts-ignore
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3000/user/${userId}`, {
                username: username,
                password: password,
                mail: mail,
                city: city,
                photo: photo // Conversion de l'image en base64
            }).then((response) => {
                const token = response.data.message;
                sessionStorage.setItem('id', JSON.stringify(token));
                window.location.reload(); // Rafraîchir la page
            });
            navigate("/app/users");
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
    };


    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/${userId}`);
            const userData = response.data;
            setUserData(userData);
            setEmail(userData.mail);
            setPassword(userData.password);
            setUsername(userData.username);
            setCity(userData.city);
            setProfilePhoto(userData.photo);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        }
    };

    const handleOpen = () => {
        fetchUserData()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // @ts-ignore
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // @ts-ignore
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // @ts-ignore
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    // @ts-ignore
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    // @ts-ignore
    const handleProfilePhotoChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64 = (reader.result as string);
                if (base64) {
                    setTimeout(() => {
                        const imageData = base64.split(/[, ]+/).pop() as string;
                        setProfilePhoto(imageData);
                    }, 500)
                }
            }
        } else {
        }
    };

    return (
        <>
            <button className="button-edition" onClick={handleOpen}>Edition</button>
            <Dialog open={open} onClose={handleClose}>
                <div className="popupEdition">
                    <h1 className="title">Edition du compte</h1>
                    <div className="buttonDivEdition">

                        <div className="photoProfil">
                            <div className="profilePhotoContainer">
                                {userData && userData.photo ? (
                                <img src={"data:image/png;base64," + userData.photo} alt="Profile" className="photoImgEdition" />
                                ) : (
                                <img src={DEFAULT_IMAGE_URL} alt="Profile" className="photoImgEdition" />
                                )}
                            </div>
                            <div className="inputDiv">
                                <label htmlFor="profilePhoto">Photo de profil :</label>
                                <input type="file" id="profilePhoto" accept="image/*" onChange={handleProfilePhotoChange} />
                                {errorMessage && <p className="error">{errorMessage}</p>}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="inputDiv">
                                <label htmlFor="username">Nom d'utilisateur :</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="email">Email :</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={mail}
                                    onChange={handleEmailChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="password">Mot de passe :</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>

                            <div className="inputDiv">
                                <label htmlFor="city">Ville :</label>
                                <input
                                    type="city"
                                    id="city"
                                    value={city}
                                    onChange={handleCityChange}
                                />
                            </div>

                            <div className="buttonDiv">
                                <button className="buttonPadding button" type="submit">
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default PopupEdition;
