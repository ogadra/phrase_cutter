import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: '20px',
    marginBottom: '20px',
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const {img, title, discription, href} = props;

  return (
      <Link href={href}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={title}
              height="140"
              image={img}
              title={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {discription}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
  );
}