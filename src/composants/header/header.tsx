import { Badge } from '@mui/material';
import './header.css'
import Notifications from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  const handleButtonClick = (event: { currentTarget: { name: any; }; }) => {
    const buttonClicked = event.currentTarget.name;
    if (buttonClicked === "users") {
      navigate('/app/users');
    } else if (buttonClicked === "tickets") {
      navigate('/app/tickets');
    } else if (buttonClicked === "notifications") {
      navigate('/app/notifications');
    } else if (buttonClicked === "exit") {
      sessionStorage.removeItem("id");
      navigate('/authentification/connexion');
    }
  }

  return (
    <div className="header">
      <div className="left-buttons">
        <button name="users" onClick={handleButtonClick} className='buttons'>Users</button>
        <button name="tickets" onClick={handleButtonClick} className='buttons'>Tickets</button>
      </div>
      <div className="right-buttons">
        <button name="notifications" className='buttons' onClick={handleButtonClick}>
          <Badge color="secondary" badgeContent={5}>
            <Notifications className="icons" />
          </Badge>
        </button>
        <button name="exit" className='buttons' onClick={handleButtonClick}>
          <ExitToAppIcon className="icons" />
        </button>
      </div>
    </div>
  )
}

export default Header
