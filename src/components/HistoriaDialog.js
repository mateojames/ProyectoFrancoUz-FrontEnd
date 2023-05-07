import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from './Typography';

export default function HistoriaDialog(props) {

  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Historia</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            <Typography variant="14" component="h5">
                Todos los que formamos parte de esta Institución coincidimos en que el verdadero punto de partida de este Proyecto hecho realidad, fue hace quince años. Cuando un Angel se hizo presente en la vida de una familia que hacía muchos años; diez, para ser preciso, lo estaban esperando. Y cuando finalmente llegó, desde el primer instante quedó muy claro que el tiempo de espera, había sido más bien de preparación, ya que no es para cualquiera “ser los padres de un Angel”, al que llamaron Franco.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Y a partir de aquí el relato de quienes más lo conocieron: Elsa, Jorge y Milagros; sus papis y hermanita menor.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            “Franco nació con una prematurez extrema que nos enfrentó a batallar una Internación en terapia neonatológica, macrocefalia, pero también mil sueños por desafiar juntos como siempre. Alrededor de sus dos añitos llegaba una de las batallas que entendíamos era la más difícil, enfrentarnos al duro diagnóstico de TGD. Lloramos, pero nunca bajamos los brazos, y sabíamos que si Dios nos daba esta “misión” también nos daría la fuerza para cumplirla. Y así fue, transitamos por especialistas y terapeutas que nos ayudaron a aprender mucho sobre el autismo. Pero sin lugar a dudas quien más nos enseñó fue nuestro hijo que nos cambió para siempre porque aumentó nuestra fe, nos acercó a personas maravillosas que nos ayudaron a ayudarlo.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Cuando era impensado este desenlace llegó literalmente de la noche a la mañana nuestra batalla “final”: Franco no despertó porque lo arrebató de nuestras vidas una muerte súbita que nos taladra el alma, y desmorona nuestras fuerzas, sin encontrar las palabras justas para explicarle a su amada hermana Milagros lo que nos estaba pasando.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Ya no éramos cuatro, éramos tres… como ella misma lo expresaba una y otra vez.
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Pero queremos escribir un nuevo capítulo en esta historia de vida. Porque aunque nuestro Franco ya no esté entre nosotros, quedan muchos “Francos” especiales a quienes ayudar. En su memoria, sentimos que la Asociación Civil Franco Uz quiere homenajearlo creando un Centro de Día en su lugar de siempre, en Mataderos, su barrio. Institución que será de vanguardia en su género, porque se ocupará no sólo de brindarle atención de excelencia a sus concurrentes, sino también contención permanente a sus familias y la posibilidad de catequizar a pesar de las diferencias e incluirlos desafiantemente en esta sociedad que parece no pertenecerles del todo”
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Es por esta hermosa razón que emprendimos este camino que si bien es mucho lo que ya hemos andado, sin duda recién comienza. Porque nuestra mirada está puesta en que todos los que se acerquen a nuestra Institución encuentren UNA MIRADA FELIZ. Fundados en hacer VIDA nuestro LEMA: "Bienaventurados los que me aman y respetan como soy y no como quisieran que fuera"
            </Typography>
            <br></br>
            <Typography variant="14" component="h5">
            Viendo en el otro lo que nos iguala en lugar de detenernos en lo que nos diferencia. Trabajando siempre en pos de dar una mirada integral al ser humano que se acerca a nosotros en busca de apoyo para transitar una situación de vida.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Salir</Button>
        </DialogActions>
      </Dialog>
  );
}