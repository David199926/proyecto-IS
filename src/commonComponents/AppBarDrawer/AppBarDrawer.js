import React, { useState } from 'react';

// material ui components
import AssessmentIcon from '@material-ui/icons/Assessment';
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
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

// styles and resources
import { makeStyles } from '@material-ui/core/styles';
import perfil from '../../Resources/Images/profile.png';
import './AppBarDrawer.css';

// user data
import auth from '../../auth';

// const values
const drawerWidth = 290;
// styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#262621',
    height: '45px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    color: "#fff"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  Link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  selectedDrawerItem: {
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      background: theme.palette.primary.main,
   },
  },
}));

export default function AppBarDrawer(props) {

  const classes = useStyles();

  // component state
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // mobile habdle toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const open = Boolean(anchorEl);

  // handle dropdown menu event
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //handle dropdown menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkReportsPermission = () => {
    if (auth.getUserData().directivo) {
      return (
        <ListItem
          button
          onClick={() => props.history.push('/reporte')}
          className={props.selected === "Reporte" ? classes.selectedDrawerItem : null}
        >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={'Reportes'} />
        </ListItem>
      )
    } else {
      return null;
    }
    
  }

  // logout function
  const logOut = () => {
    props.history.push('/');
  }
  // to profile function
  const toProfile = () => {
    props.history.push('/perfil')
  }

  // Drawer
  const drawer = (
    <div>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {/* es directivo */}
          {checkReportsPermission()}
          {/* colaboraciones */}
          <ListItem
            button
            onClick={() => props.history.push('/colaboraciones')}
            className={props.selected === "Colaboraciones" ? classes.selectedDrawerItem : null}
          >
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary={'Colaboraciones'} />
          </ListItem>
          {/* mis actividades */}
          <ListItem
            button
            onClick={() => props.history.push('/mis-actividades')}
            className={props.selected === "Mis actividades" ? classes.selectedDrawerItem : null}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={'Mis actividades'} />
          </ListItem>
          {/* explorar */}
          <ListItem
            button
            onClick={() => props.history.push('/explorar')}
            className={props.selected === "Explorar" ? classes.selectedDrawerItem : null}
          >
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary={'Explorar'} />
          </ListItem>
          {/* ayuda */}
          <ListItem
            button
            onClick={() => props.history.push('/ayuda')}
            className={props.selected === "Ayuda" ? classes.selectedDrawerItem : null}
          >
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'Ayuda'} />
          </ListItem>
        </List>
      </div>
    </div>
  )

  // AppBar
  const appBar = (
    <AppBar position="fixed" className={classes.appBar} >
      <Toolbar className={classes.toolbar}>
        {/* menu hamburguesa */}
        <IconButton
          color="primary"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="subtitle1">
          Aplicación
        </Typography>
        {/* notificación */}
        <IconButton Style={"padding-right: 30px"} color="primary">
          <Badge badgeContent={0} color="secondary" >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* foto de perfil */}
        <div className="username">
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
            <MenuItem onClick={toProfile}>
              <span className={classes.Link}>Ver perfil</span>
            </MenuItem>
            <MenuItem onClick={logOut}>
              <span className={classes.Link} >Cerrar sesión</span>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )

  return (
    <div className={classes.root}>
      {/* App Bar */}
      {appBar}
      {/* App Drawer */}
      <nav className={classes.drawer}>
        {/* Mobile Drawer */}
        <Hidden mdUp >
          <Drawer
            className={classes.drawer}
            variant="temporary"
            classes={{ paper: classes.drawerPaper }}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* Desktop Drawer */}
        <Hidden smDown>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {/* Contenido */}
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  )
};