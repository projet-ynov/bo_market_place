import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import "./tickets.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0B7697',
    color: theme.palette.common.white,
    'font-family': 'inherit',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 200,
    cursor: 'pointer',
    '&:hover': {
      maxWidth: 'unset',
      overflow: 'visible',
      whiteSpace: 'normal',
    },
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

function chunk(str: string, size: number) {
  const chunkedArr = [];
  let index = 0;
  while (index < str.length) {
    chunkedArr.push(str.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
}

function Tickets() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [messages, setMessages] = useState<ModelMessages[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
    });

    newSocket.on('new-ticket', (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Récupérer les tickets existants depuis le serveur lors du chargement initial
    fetchTickets();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/message/messages');
      const updatedMessages = response.data.map((message: ModelMessages) => {
        return {
          ...message,
        };
      });
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets :', error);
    }
  };

  const reserveTicket = (ticketId: string) => {
    const reservedTicket = messages.find((message) => message._id === ticketId);
    if (reservedTicket) {
      // Vérifiez si le ticket est déjà réservé par un autre administrateur
      if (reservedTicket.reservedBy) {
        alert('Ce ticket est déjà réservé par un autre administrateur.');
      } else {
        const adminString = sessionStorage.getItem("admin");
        const admin: AdminModel = adminString ? JSON.parse(adminString) : null;
        const reservedBy = admin?._id;
        const updatedMessages = messages.map((message) => {
          if (message._id === ticketId) {
            return {
              ...message,
              reservedBy: reservedBy,
            };
          }
          return message;
        });
        setMessages(updatedMessages);
        // Appelez votre API pour mettre à jour le ticket dans la base de données avec la propriété reservedBy
        axios.put(`http://localhost:3000/message/updateMessage/${ticketId}`, { reservedBy: reservedBy });
      }
    }
  };

  // Tri des messages par ordre décroissant de la date
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB: Date = new Date(b.date); // Spécifiez le type Date ici
    return dateB.getTime() - dateA.getTime(); // Utilisez getTime() pour obtenir la valeur numérique de la date
  });

  const deleteTicket = async (ticketId: string) => {
    try {
      await axios.delete(`http://localhost:3000/message/delete/${ticketId}`);
      // Mettez à jour la liste des messages après la suppression réussie
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== ticketId));
    } catch (error) {
      console.error("Erreur lors de la suppression du ticket :", error);
      alert("Erreur lors de la suppression du ticket");
    }
  };

  return (
    <div>
      <div className="users">
        <h1 className="title">TICKETS</h1>
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, minHeight: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Réserver</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedMessages.map((message, index) => (
                  <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {chunk(message.title, 40).map((chunkedLine, i) => (
                        <React.Fragment key={i}>
                          {chunkedLine}
                          <br />
                        </React.Fragment>
                      ))}
                    </TableCell>
                    <TableCell align="center">{message.profilUser.mail}</TableCell>
                    <TableCell align="center">{new Date(message.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell align="center">
                      {chunk(message.description, 40).map((chunkedLine, i) => (
                        <React.Fragment key={i}>
                          {chunkedLine}
                          <br />
                        </React.Fragment>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                    <button className={`button-reserve ${message.reservedBy === undefined ? 'button-reserveOFF' : ''}`} onClick={() => reserveTicket(message._id)}>Réserver</button>
                    </TableCell>
                    <TableCell align="center">
                      <button className="button-supp" onClick={() => deleteTicket(message._id)}>Supprimer</button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
