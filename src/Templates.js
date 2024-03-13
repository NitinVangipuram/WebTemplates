import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Portfolio from "../src/assests/img/Portfolio.png";
import p from "../src/assests/img/Screenshot 2024-03-11 161604.png";


// Example data for the cards
const cardsData = [
  {
    title: 'Portfolio Template',
    description: 'A simple portfolio template with a clean and minimalistic design.',
    imageUrl: p,
    link: '/template/portfolio'
  }
];

function Templates() {
    const navigate = useNavigate();
    const theme = createTheme({
        palette: {
          primary: {
            main: '#556cd6',
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
      });
  return (
    <>
    <ThemeProvider theme={theme}>
   <CssBaseline /> {/* Ensures consistent baseline styles and applies global gradient */}
    <Grid container spacing={4} style={{marginTop:"100px" ,padding:"15px"}}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card >
          <CardActionArea onClick={() => card.link && navigate(card.link)}>
              <CardMedia
                component="img"
                height="240"
                image={card.imageUrl}
                alt={card.title}
                style={{
   
    objectPosition: 'center top' // Adjusts the crop focus. Change as needed.
  }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </ThemeProvider>
    </>
  );
}

export default Templates;
