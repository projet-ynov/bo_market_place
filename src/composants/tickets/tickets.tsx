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
      console.log('Connecté au serveur websocket');
    });

    newSocket.on('new-ticket', (message: any) => {
      console.log('Nouveau message reçu :', message);
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
      const response = await axios.get('http://localhost:3000/message/messages'); // Remplacez l'URL par votre route pour récupérer les tickets
      setMessages(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets :', error);
    }
  };

  const sendMessage = () => {
    const userId = "645d2661a5eb455459ce61b0"
    const date = new Date();

    if (title && description && userId && socket) {
      const message = {
        title,
        description,
        userId,
        date,
      };

      socket.emit('ticket', message);

      setTitle('');
      setDescription('');
    }
  };

  // Tri des messages par ordre décroissant de la date
  const sortedMessages = messages.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB: Date = new Date(b.date); // Spécifiez le type Date ici
    return dateB.getTime() - dateA.getTime(); // Utilisez getTime() pour obtenir la valeur numérique de la date
  });

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer un message</button> */}

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
