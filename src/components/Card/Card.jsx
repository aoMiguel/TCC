import { Card as CardComponent, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

export default function Card({ src, alt, price }) {
  return (
    <CardComponent sx={{ 
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
        borderRadius: '20px',
      }}>
      <CardMedia
        component="img"
        alt={alt}
        height="140"
        image={src}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {alt}
        </Typography>
        {price && (
          <Typography variant="h6" sx={{ color: 'text.primary', marginTop: 2 }}>
            R$ {price}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </CardComponent>
  );
}
