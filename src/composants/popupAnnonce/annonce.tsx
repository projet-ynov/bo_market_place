import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import './annonce.css';
import ListeAnnonces from './listAnnoncePost/listAnnonce';
import ListeAnnoncesBuy from './listAnnonceBuy/listAnnonceBuy';
import axios from 'axios';

function PopupAnnonce({ userId }:{userId:string}) {
  const [open, setOpen] = useState(false);
  const [annoncesAchetees, setAnnoncesAchetees] = useState<ModelAnnonceBuy[]>([]);
  const [annoncesPubliees, setAnnoncesPubliees] = useState<ModelAnnonce[]>([]);
  const [affichageAnnonces, setAffichageAnnonces] = useState('achetees');
  const [titre, setTitre] = useState('Annonces achetées');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      if (affichageAnnonces === 'achetees') {
        sessionStorage.setItem('typeAnnonce', 'achetees')
        fetchAnnoncesAchetees();
      } else {
        sessionStorage.setItem('typeAnnonce', 'publiees')
        fetchAnnoncesPubliees();
      }
    }
  }, [open, affichageAnnonces]);


  const fetchAnnoncesAchetees = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/buy/myBuy/${userId}`);
      const data = response.data;
      setAnnoncesAchetees(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces achetées :', error);
    }
  };

  const fetchAnnoncesPubliees = async () => {
    try {
      let token = sessionStorage.getItem("token");
      if (token !== null) {
        token = JSON.parse(token)

        const response = await axios.get(`http://localhost:3000/myAnnonces/${userId}`, {
          headers: {
            Authorization: token,
          }
        });
        const data = response.data;
        setAnnoncesPubliees(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces publiées :', error);
    }
  };



  useEffect(() => { // Ajout de l'effet de mise à jour du titre
    if (affichageAnnonces === 'achetees') {
      setTitre('Annonces achetées');
    } else {
      setTitre('Annonces publiées');
    }
  }, [affichageAnnonces]);
  return (
    <>
      <button className="button-annonce" onClick={handleOpen}>
        Annonces
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className="popupAnnonce">
          <h1 className="title">{titre}</h1>
          <div className="buttonDivAnnonce">
            <button className='marginPadding button' onClick={() => setAffichageAnnonces('achetees')}>Annonces achetées</button>
            <button className='button' onClick={() => setAffichageAnnonces('publiees')}>Annonces publiées</button>
          </div>
          {affichageAnnonces === 'achetees' && <ListeAnnoncesBuy annonces={annoncesAchetees}/>}

          {affichageAnnonces === "publiees" && <ListeAnnonces annonces={annoncesPubliees} />}
        </div>
      </Dialog>
    </>
  );
}

export default PopupAnnonce;
