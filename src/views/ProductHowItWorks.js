import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 80,
  my: 4,
};

function ProductHowItWorks() {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };

  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          ¿Cómo comenzar?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="/wpp2.png"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Contactanos por vía telefonica para realizar el registro.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/seleccion2.png"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Tendremos un primer encuentro de diagnostico y selección de actividades.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/calendar.png"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {'Podrás registrarte en nuestra plataforma y hacer un seguimiento del tratamiento.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          sx={{ mt: 8 }}
          onClick={() => openInNewTab('https://wa.me/+5491131503259')}
        >
          Contactarme
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;