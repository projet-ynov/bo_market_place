import { Badge } from '@mui/material';
import './header.css';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Header() {
  const [hasNewTickets, setHasNewTickets] = useState(false);
  const socket = io('http://localhost:3000');
  const navigate = useNavigate();

  const handleButtonClick = (event: { currentTarget: { name: any; }; }) => {
    const buttonClicked = event.currentTarget.name;

    if (buttonClicked === "users") {
      navigate('/app/users');
    } else if (buttonClicked === "tickets") {
      setHasNewTickets(false); // Reset the new tickets flag when navigating to the tickets page
      navigate('/app/tickets');
    } else if (buttonClicked === "exit") {
      sessionStorage.clear();
      navigate('/authentification/connexion');
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
    });

    socket.on('new-ticket', () => {
      console.log('New ticket received');
      setHasNewTickets(true); // Set the new tickets flag when receiving a new ticket
    });

   
  }, []);

  return (
    <div className="header">
      <div className="left-buttons">
        <button name="users" onClick={handleButtonClick} className='buttons'>Users</button>
        <button name="tickets" onClick={handleButtonClick} className='buttons'>
          {hasNewTickets ? (
            <Badge color="secondary" badgeContent={"!"}>
              <LocalActivityIcon className="icons" />
            </Badge>
          ) : (
            <LocalActivityIcon className="icons" />
          )}
        </button>
      </div>
      <div className="right-buttons">
        <button name="exit" className='buttons' onClick={handleButtonClick}>
          <ExitToAppIcon className="icons" />
        </button>
      </div>
    </div>
  );
}

export default Header;