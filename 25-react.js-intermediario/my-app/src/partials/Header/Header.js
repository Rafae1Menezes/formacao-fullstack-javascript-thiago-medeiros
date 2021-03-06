import { useState } from 'react'

import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
   Drawer,
   List,
   ListItem,
   ListItemIcon,
   ListItemText
} from '@material-ui/core'

import {useNavigate} from 'react-router-dom'

import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import useStyles from './Header.style'




const Header = ({ user }) => {

   const [menuOpen, setMenuOpen] = useState(false)
   const classes = useStyles()
   const navigate = useNavigate();

   const handleToggleMenu = () => {
      setMenuOpen(!menuOpen)
   }

   const handleMenuClick = route => {
      navigate(route)
      handleToggleMenu()
   }

   return (
      <>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={()=>handleToggleMenu()}
               >
                  <MenuIcon />

               </IconButton>

               <Typography variant="h6" component="div" className={classes.title} >
                  My App
               </Typography>
               {
                  user.logged
                  ? <Typography component="h6">{user.email}</Typography>
                  : <Button color="inherit">Login</Button>
               }
               

            </Toolbar>
         </AppBar>

         <Drawer open={menuOpen} onClose={()=>handleToggleMenu()}>
            <List>
               <ListItem button onClick={()=>handleMenuClick('/')}>
                  <ListItemIcon>
                     <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
               </ListItem>
               <ListItem button onClick={()=>handleMenuClick('/customers')}>
                  <ListItemIcon>
                     <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText>Lista de Clientes</ListItemText>
               </ListItem>
               <ListItem button onClick={()=>handleMenuClick('/customers/add')}>
                  <ListItemIcon>
                     <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText>Cadastro de Clientes</ListItemText>
               </ListItem>
            </List>
          </Drawer>
      </>
   )
}

export default Header
