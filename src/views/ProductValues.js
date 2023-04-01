import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/doctor4.png"
                alt="suitcase"
                sx={{ height: 80 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Seguimiento Terapeutico
              </Typography>
              <Typography variant="h5">
                {
                  'Nuestro programa está diseñado para brindar apoyo emocional y psicológico a los jóvenes.'
                }

                {
                  ' A través de sesiones regulares con profesionales especializados, pueden recibir la ayuda que necesitan para desarrollar habilidades de comunicación y comprensión emocional.'
                }

              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/book2.png"
                alt="graph"
                sx={{ height: 80 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Acompañamiento Escolar
              </Typography>
              <Typography variant="h5">
                {
                  'Ofrecemos un programa de sesiones individuales y/o grupales con educadores especializados en trastornos de aprendizaje.'
                }

                {' Se trabajan diferentes aspectos del desarrollo y se ofrecen estrategias para abordar las dificultades que puedan estar enfrentando los jóvenes, con el objetivo de fomentar su desarrollo integral.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/collaboration4.png"
                alt="clock"
                sx={{ height: 80 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Tratamiento Interdisciplinario
              </Typography>
              <Typography variant="h5">
                {'Nuestras sesiones interdisciplinarias involucran a un equipo de profesionales de diferentes áreas, '}
                {'  incluyendo psicólogos, educadores, terapeutas ocupacionales, y/o especialistas en comunicación, según las necesidades individuales de cada joven'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;