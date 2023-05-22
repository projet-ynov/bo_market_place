import { useEffect, useState } from 'react';
import './users.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PopupAnnonce from '../popupAnnonce/annonce';
import PopupEdition from '../popupEdition/edition';
import axios from 'axios';
import { io } from 'socket.io-client';

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

function Users() {
    const [users, setUsers] = useState<UserModel[]>([]);
    const DEFAULT_IMAGE_URL = './../../../public/icon-user.png';
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        fetchUsers();

        const socket = io('http://localhost:3000');
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            const usersData = response.data;
            setUsers(usersData);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
    };

    const sendMessage = () => {
        const userId = '645d2661a5eb455459ce61b0';
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

    return (
        <>
            <div className="users">
                <h1 className="title">USERS</h1>
                <div className="table">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, minHeight: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align="center">Photo</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">Username</StyledTableCell>
                                    <StyledTableCell align="center">Ville</StyledTableCell>
                                    <StyledTableCell align="center">Annonces</StyledTableCell>
                                    <StyledTableCell align="center">Edition</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="center">
                                            {user && user.photo ? (
                                                <img src={'data:image/png;base64,' + user.photo} alt="Profile" className="photoImg" />
                                            ) : (
                                                <img src={DEFAULT_IMAGE_URL} alt="Profile" className="photoImg" />
                                            )}
                                        </TableCell>
                                        <TableCell align="center">{user.mail}</TableCell>
                                        <TableCell align="center">{user.username}</TableCell>
                                        <TableCell align="center">{user.city}</TableCell>
                                        <TableCell align="center">
                                            <PopupAnnonce userId={user._id} />
                                        </TableCell>
                                        <TableCell align="center">
                                            <PopupEdition userId={user._id} />
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
}

export default Users;
