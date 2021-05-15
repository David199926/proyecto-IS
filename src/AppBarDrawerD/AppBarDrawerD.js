import AssessmentIcon from '@material-ui/icons/Assessment';
import React, { useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExploreIcon from '@material-ui/icons/Explore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import perfil from '../Resources/Images/perfil.png';

// styles
import './AppBarDrawerD.css';

// const values
const drawerWidth = 290;

// styles
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 30,
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#262621',
    height: '45px'
  },
}));



export default function AppBarDrawer() {
    
  const classes = useStyles();

  // component state
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  
  // handle dropdown menu event
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //handle dropdown menu close
  const handleClose = () => {
   setAnchorEl(null);
  };


  return(
   <div>
      {/* App Bar */}
      <AppBar  className={classes.appBar} >
        <Toolbar className={classes.toolbar}>     
          <Typography className={classes.title} variant="subtitle1" Style={" padding-left: 30px"} >
            Aplicación
          </Typography>
          {/* notificación */}
          <IconButton  color="inherit" Style={" padding-right: 30px" }  >
            <Badge badgeContent={7} color="secondary" >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>
          {/* foto de perfil */}
          <div class="username">
           <img src={perfil} alt="" className="userpict" onClick={handleMenu} />
             
             {/* dropdown menu*/}
             <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose} >
                <MenuItem onClick={handleClose}>Ver perfil</MenuItem>
                <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
             </Menu>

          </div>
       </Toolbar>
      </AppBar>
      {/* Drawer*/}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
        paper: classes.drawerPaper }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
         <List>
         <ListItem button>
             <ListItemIcon>
               <AssessmentIcon />
             </ListItemIcon>
             <ListItemText primary={'Reportes'} />
           </ListItem>
           <ListItem button>
             <ListItemIcon>
               <PeopleAltIcon />
             </ListItemIcon>
             <ListItemText primary={'Colaboraciones'} />
           </ListItem>
           <ListItem button>
             <ListItemIcon>
               <AssignmentIcon />
             </ListItemIcon>
             <ListItemText primary={'Mis actividades'} />
           </ListItem>
           <ListItem button>
             <ListItemIcon>
               <ExploreIcon />
             </ListItemIcon>
             <ListItemText primary={'Explorar'} />
           </ListItem>
           <ListItem button>
             <ListItemIcon>
               <HelpOutlineIcon />
             </ListItemIcon>
             <ListItemText primary={'Ayuda'} />
           </ListItem>
         </List>
        </div>
     </Drawer>
    </div>
        
    )

};