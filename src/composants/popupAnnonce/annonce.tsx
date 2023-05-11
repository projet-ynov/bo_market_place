import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import './annonce.css';
import ListeAnnonces from './listeAnnonce/listeAnnonce';
import { ModelAnnonce } from '../../services/model';

function PopupAnnonce() {
  const [open, setOpen] = useState(false);
  const [annoncesAchetees, setAnnoncesAchetees] = useState<ModelAnnonce[]>([]);
  const [annoncesPubliees, setAnnoncesPubliees] = useState<ModelAnnonce[]>([]);
  const [affichageAnnonces, setAffichageAnnonces] = useState('achetees');
  const [titre, setTitre] = useState('Annonces achetées'); // Ajout de la variable titre

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Données générées
  const achetees: ModelAnnonce[] = [
    { id: 1, name: 'Annonce 1', description: 'Description 1', prix: 69, images: ['https://images.pexels.com/photos/1645956/pexels-photo-1645956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','https://images.pexels.com/photos/1645956/pexels-photo-1645956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'] },
    { id: 2, name: 'Annonce 2', description: 'Description 1', prix: 69, images: ['https://images.pexels.com/photos/1645956/pexels-photo-1645956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'] },
    { id: 3, name: 'Annonce 3', description: 'Description 1', prix: 69, images: ['https://images.pexels.com/photos/1645956/pexels-photo-1645956.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'] },
  ];
  const publiees: ModelAnnonce[] = [
    { id: 1, name: 'Annonce 2', description: 'Description 2', prix: 2003, images: [''] },
  ];

  useEffect(() => {
    return setAnnoncesAchetees(achetees);
  }, []);

  useEffect(() => {
    setAnnoncesPubliees(publiees);
  }, []);

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
          {affichageAnnonces === 'achetees' && <ListeAnnonces annonces={annoncesAchetees} />}

          {affichageAnnonces === "publiees" && <ListeAnnonces annonces={annoncesPubliees} />}
                </div>
            </Dialog>
        </>
    );
}

export default PopupAnnonce;
