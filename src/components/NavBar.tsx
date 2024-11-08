'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function NavBar() {
  const { data: session } = useSession();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navigationItems = [
    { label: 'Domov', href: '/', icon: <HomeIcon /> },
    session
      ? { label: 'Odhlásenie', href: '/auth/odhlasenie', icon: <LogoutIcon /> }
      : { label: 'Prihlásenie', href: '/auth/prihlasenie', icon: <LoginIcon /> },
  ];

  return (
    <>
      {/* IconButton to toggle Drawer */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ position: 'fixed', top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer Component */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {navigationItems.map((item, index) => (
            <Link href={item.href} key={index} passHref>
              <ListItem button component="a" onClick={toggleDrawer(false)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
}
