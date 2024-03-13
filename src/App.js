import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';

import Form from './components/Form';
import { saveAs } from 'file-saver';
import Header from './components/Header';

const theme = createTheme({
 
  palette: {
    primary: {
      main: '#556cd6',
    },
    gradient: {
      main: 'linear-gradient(to right, #0F2027, #203A43, #2C5364)', // Dark blueish gradient
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: "monospace",
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        body {
          background: linear-gradient(270deg, #0F2027, #203A43, #2C5364, #0F2027);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
          color: #fff;
        }
      `,
    },
  },
});

function App() {

  return (
    <>
       <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styles and applies global gradient */}
      <Container maxWidth="lg" >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh' ,marginLeft:"5%" }}>
          <Box sx={{ width: '60%' }}>
            {/* Content on the left */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Welcome to Our Platform
            </Typography>
            <Typography>
            Discover premium web templates for all your needs. Elevate your online presence with our easy-to-use, customizable designs. Start building your dream site today!
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

    </>
  );
}

export default App;
