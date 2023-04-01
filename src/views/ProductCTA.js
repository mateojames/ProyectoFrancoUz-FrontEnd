import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Button from '../components/Button';

function ProductCTA() {

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container component="section" sx={{ mt: 10, mb: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} sx={{ zIndex: 1, display: { md: 'none', xs: 'block' }}}>
            <Box
            component="img"
            src="/donar.png"
            alt="donacion"
            sx={{
                width: '100%',
                display: 'flex',
                background: 'url(/productCTAImageDots.png)',
                py: 8,
                px: 3,
            }}
            >
            </Box>
            </Grid>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'secondary.light',
              py: 8,
              px: 3
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h3" component="h2" gutterBottom>
                Colabora con nosotros
              </Typography>
              <Typography variant="h5"> 
                Es fácil y seguro.
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                sx={{ width: '100%', padding: 1, mt:2 }}
                onClick={()=> openInNewTab('https://link.mercadopago.com.ar/bmeritello')}>
                       <img src='/mp.png' alt="mercadopago" style={{maxWidth: 100}} />
                      Donar Ahora
            </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="/donar.png"
            alt="donacion"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 500,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;