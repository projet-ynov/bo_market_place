import { useState } from 'react';
import { ModelAnnonce } from '../../../services/model';

type AnnonceRowProps = {
  annonce: ModelAnnonce;
};

function AnnonceRow({ annonce }: AnnonceRowProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleRowClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="annonceRow" onClick={handleRowClick}>
      <div className="annonceRowHeader">
        <h3>ID: {annonce.id}</h3>
        <h3>Nom: {annonce.name}</h3>
      </div>
      {showDetails && (
        <div className="annonceRowDetails">
          <p>Description: {annonce.description}</p>
          <h4>Prix: {annonce.prix} €</h4>
          <div className="annonceRowImages">
            {annonce.images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnnonceRow
