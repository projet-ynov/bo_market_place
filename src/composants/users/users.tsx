import './users.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PopupAnnonce from '../popupAnnonce/annonce';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0B7697",
        color: theme.palette.common.white,
        "font-family": "inherit",
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

function createData(
    id: number,
    email: string,
    pseudo: string,
) {
    return { id, email, pseudo };
}

const rows = [
    createData(1, "florian.leborgne@gmail.com", "FloLo-Swipe"),
    createData(2, "axel.figerou@gmail.com", "Groudse"),
    createData(3, "romain.martin@gmail.com", "Show"),
    createData(4, "romain.martin@gmail.com", "Show"),
    createData(5, "romain.martin@gmail.com", "Show"),
];

function Users() {

    return (
        <>
            <div className='users'>
                <h1 className='title'>USERS</h1>
                <div className='table'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, minHeight: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">Pseudo</StyledTableCell>
                                    <StyledTableCell align="center">Annonces</StyledTableCell>
                                    <StyledTableCell align="center">Modération</StyledTableCell>
                                    <StyledTableCell align="center">Edition</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.pseudo}</TableCell>
                                        <TableCell align="center">
                                            <PopupAnnonce />
                                        </TableCell>
                                        <TableCell align="center">
                                            <button className='button-moderation'>Modérer</button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <button className='button-edition'>Editer</button>
                                        </TableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </>
    )
}

export default Users
