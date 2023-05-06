import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import { display } from '@mui/system';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductLocation() {
    const [windowSize, setWindowSize] = React.useState(getWindowSize()); 

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    React.useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 5, mb: 5, display: 'flex', position: 'relative', justifyContent:'center', alignItems:'center'}}>
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={3} sx={{zIndex:1}}>
            <Grid item xs={12} md={12} sx={{display: 'flex', position: 'relative', justifyContent:'center', alignItems:'center'}}>
                <Typography variant="h4" marked="center" component="h2" sx={{ mb: 2 }}>
                ¿Donde encontrarnos?
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <Typography variant="h6" sx={{mb: 2}}>
                    Nos encontramos en el barrio de Mataderos, sobre la calle Andalgalá 2269
                </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                <Box sx={item}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.6972238142384!2d-58.50905298479964!3d-34.6623486804444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc902c4075f6b%3A0xd46914a879896059!2sAsociaci%C3%B3n%20Civil%20Franco%20Uz!5e0!3m2!1ses!2sar!4v1680440261162!5m2!1ses!2sar" style={{border:0, width: windowSize.innerWidth * 0.45, height: windowSize.innerHeight *0.45}} allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Box>
            </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductLocation;