import { Dialog } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import './edition.css';
import { ModelAnnonce } from '../../services/model';
import axios from 'axios';

    // @ts-ignore
function PopupEdition({ userId }) {
    const [open, setOpen] = useState(false);

    const [userData, setUserData] = useState(null);
    const [mail, setEmail] = useState(userData ? userData.mail : "");
    const [password, setPassword] = useState(userData ? userData.password : "");
    const [username, setUsername] = useState(userData ? userData.username : "");
    const [profilePhoto, setProfilePhoto] = useState(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Assurez-vous d'ajouter la référence avec le bon type

    // @ts-ignore
    const handleSubmit = async (event) => {
        event.preventDefault();
        // try {
        //   await axios.post('http://localhost:3000/admin/login', {
        //     mail: email,
        //     password: password
        //   }).then((response) => {
        //     const token = response.data.message;
        //     sessionStorage.setItem('id', JSON.stringify(token));
        //     console.log(token);
        //   });
        //   navigate("/app/users");
        // }
        // catch (e) {
        // @ts-ignore
        //   if (e.response.request.response.includes("email")) {
        //     setEmailExist(true)
        //   }
        // }
    };

    
    const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/user/${userId}`);
          const userData = response.data;
          setUserData(userData);
          setEmail(userData.mail);
          setPassword(userData.password);
          setUsername(userData.username);
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
    const handleProfilePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (canvas) {
                    const MAX_WIDTH = 150;
                    const MAX_HEIGHT = 150;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    if (canvas) {
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);
                        } else {
                            console.error("Impossible d'obtenir le contexte 2D du canvas.");
                        }
                    } else {
                        console.error("Référence à l'élément canvas non définie.");
                    }
                } else {
                    console.error("Référence à l'élément canvas non définie.");
                }
            };
            if (e.target) {
                img.src = e.target.result as string;
            } else {
                console.error("Événement 'load' sans cible valide.");
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <button className="button-edition" onClick={handleOpen}>
                Edition
            </button>
            <Dialog open={open} onClose={handleClose}>
                <div className="popupEdition">
                    <h1 className="title">Edition du compte</h1>
                    <div className="buttonDivEdition">

                        <div className="photoProfil">
                            <canvas ref={canvasRef}></canvas> {/* Assurez-vous d'ajouter la référence ici */}
                            <div className="inputDiv">
                                <label htmlFor="profilePhoto">Photo de profil :</label>
                                <input
                                    type="file"
                                    id="profilePhoto"
                                    accept="image/*"
                                    onChange={handleProfilePhotoChange}
                                />
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
