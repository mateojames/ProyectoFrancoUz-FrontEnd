import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from './Typography';

export default function ConozcanosDialog(props) {

  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Conozcanos</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <Typography variant="14" component="h5">
                Somos Claudia y Gabriel, un matrimonio que cree y siente que Nada es por casualidad, porque nuestras vidas se encontraron para, desde entonces, dar cada paso juntos.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Un día, ya con dos pimpollitos creciendo a nuestro lado colmando nuestras vidas de bendiciones; comenzamos a orientar nuestra fuerza e ilusiones en delinear un Proyecto, que sentíamos, que iba a cambiar por siempre nuestras vidas, porque así lo elegimos. Y porque, no hay forma de que el amor te atraviese sin dejar huellas, sin que te modifique.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            El amor no te suelta, al contrario, te toma, te abraza; y más aún, te une en comunión con otros.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Y justamente esa es la explicación que le encontramos a nuestro encuentro con los papás de Franco: Elsa y Jorge. Encuentro de almas, de sentimientos, de fuerzas, encuentro para caminar juntos con un objetivo en común: ser en el AMOR.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Es por esta hermosa razón que emprendimos este camino que si bien es mucho lo que ya hemos andado, sin duda recién comienza. Porque nuestra mirada esta puesta en que todos los que se acerquen a nuestra Institución encuentren UNA MIRADA FELIZ. FUNDADOS EN HACER VIDA NUESTRO LEMA: "Bienaventurados los que me aman y respetan como soy y no como quisieran que fuera"
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Viendo en el otro lo que nos iguala en lugar de detenernos en lo que nos diferencia.Trabajando siempre en pos de dar una mirada integral al ser humano que se acerca a nosotros en busca de apoyo para transitar una situación de vida.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Salir</Button>
        </DialogActions>
      </Dialog>
  );
}