import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import './listAnnonce.css';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material';
import AnnonceEdit from '../annonceEdit/annonceEdit'
import axios from 'axios';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0B7697',
    color: theme.palette.common.white,
    'font-family': 'inherit',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type ListeAnnoncesProps = {
  annonces: ModelAnnonce[];
};

// Fonction pour formater la date
const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('fr-FR');
  return formattedDate;
};

function ListeAnnonces({ annonces }: ListeAnnoncesProps) {
  const typeAnnonce = sessionStorage.getItem('typeAnnonce');
  
  const deleteAnnonce = async (annonceId: string, status: number) => {
    if (status === 0) {
      try {
        const response = await axios.delete('http://localhost:3000/delete', {
          data: {
            id: annonceId
          }
        });
        window.location.reload()
      } catch (error) {
        console.error("Erreur lors de la suppression de l'annonce :", error);
        alert("Erreur lors de la suppression de l'annonce : " + error);

      }
    } else {

      alert("Impossible de supprimer l'annonce. Elle est vendue.");

    }
  };

  return (
    <div className="tableAnnonce">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Edition</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {annonces.map((annonce, index) => (
              <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{annonce.title}</TableCell>
                <TableCell align="center">{formatDate(annonce.date)}</TableCell>
                <TableCell align="center">
                  <AnnonceEdit annonceId={annonce._id} />
                </TableCell>
                <TableCell align="center">
                  <button onClick={() => deleteAnnonce(annonce._id, annonce.status)}>Supprimer</button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListeAnnonces