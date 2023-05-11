import { useState } from 'react';
import { ModelAnnonce } from '../../../services/model';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Box,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  detailsBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingBottom: '20px',
  },
  detailsDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '18px',
    paddingBottom: '10px',
    color: '#0B7697'
  },
  content: {
    fontSize: '16px',
    paddingBottom: '10px',
    marginLeft: '10px',
  },
});

type RowProps = {
  annonce: ModelAnnonce;
};

function Row({ annonce }: RowProps) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow hover className={classes.root} onClick={() => setOpen(!open)}>
        <TableCell>{annonce.id}</TableCell>
        <TableCell>{annonce.name}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.detailsBox}>
            <Box className={classes.detailsDiv}>
              <Typography className={classes.title}>Prix:</Typography>
              <Typography className={classes.content}>{annonce.prix}€</Typography>
              </Box>
              <Box className={classes.detailsDiv}>
              <Typography className={classes.title}>Description:</Typography>
              <Typography className={classes.content}>{annonce.description}</Typography>
              </Box>
              <Box className={classes.detailsDiv}>
              <Typography className={classes.title}>Photo:</Typography>
              <Typography className={classes.content}>{annonce.images.join('\n')}</Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

type ListeAnnoncesProps = {
  annonces: ModelAnnonce[];
};

function ListeAnnonces({ annonces }: ListeAnnoncesProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {annonces.map((annonce, index) => (
            <Row key={index} annonce={annonce} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListeAnnonces;
