import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

import ImageFrancoUz from '../images/frente3.png';

export default function ProductHero(props) {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${ImageFrancoUz})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={ImageFrancoUz}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {props.title}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        {props.description}
      </Typography>
      <Button
        show={props.showConozcanos}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        Conozcanos
      </Button>
    </ProductHeroLayout>
  );
}