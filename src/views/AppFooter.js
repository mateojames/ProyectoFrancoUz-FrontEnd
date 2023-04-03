import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'secondary.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'secondary.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={4} md={2}>
                <Typography variant="h6" marked="left" gutterBottom>
                Redes Sociales
                </Typography>
                <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0, display:'flex', flexDirection:'row' }}>
                <Box component="li" sx={{ py: 0.5 }}>
                    <Box component="a" href="https://www.facebook.com/asociacionfrancouz/" sx={iconStyle}>
                        <img
                            src="/appFooterFacebook.png"
                            alt="Facebook"
                        />
                        </Box>
                    </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                    <Box component="a" href="https://twitter.com/ac_francouz" sx={iconStyle}>
                        <img
                            src="/appFooterTwitter.png"
                            alt="Twitter"
                        />
                        </Box>
                    </Box>
                </Box>
                <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0, display:'flex', flexDirection:'row' }}>
                <Box component="li" sx={{ py: 0.5 }}>
                    <Box component="a" href="https://www.youtube.com/watch?v=mlgdRd5nKgI" sx={iconStyle}>
                        <img
                            src="/youtube.png"
                            alt="Facebook"
                        />
                        </Box>
                    </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                    <Box component="a" href="https://www.instagram.com/asociacionfrancouz/" sx={iconStyle}>
                        <img
                            src="/instagram.png"
                            alt="Twitter"
                        />
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <Typography variant="h6" marked="left" gutterBottom>
                Contacto
                </Typography>
                <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                    <Typography variant="h9" sx={{ my: 5 }}>
                        Teléfono/s : ​1146860754 // 1531022392 
                    </Typography>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                    <Typography variant="h9" sx={{ my: 5 }}>
                        Email : asociacionfrancouz@gmail.com
                    </Typography>
                </Box>
                </Box>
            </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}