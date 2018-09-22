import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddPhotoAltIcon from '@material-ui/icons/AddPhotoAlternate';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        height: '100%'
    },
    item: {
        height: '60%'
    },
    paper: {
        height: '100%',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        overflow: 'hidden'
    },
    uploadzone: {
        cursor: 'pointer'
    },
    height100: {
        height: '100%',
    },
    icon: {
        fontSize: '5rem'
    },
    result: {
        marginTop: theme.spacing.unit * 2,
    },
    image: {
        width:'250px'
    }
});

const mainPage = props => {
    const {classes, hash, isUploading, isComplete, handleFile } = props;

    return(
        <Grid container className={classes.root} justify="center" alignItems="center" spacing={16}>
          <Grid item md={6} className={classes.item}>
            <Paper className={classes.paper}>
              <Grid container justify="center" alignItems="center" className={classes.height100}>
                <Grid item md={12}>
                  <label htmlFor="file-form" className={classes.uploadzone} style={{display:isUploading ? 'none':'block'}}>
                    <Typography variant="display3">
                      <AddPhotoAltIcon className={classes.icon} />Choose Image...
                    </Typography>
                    <input
                      id="file-form"
                      type="file"
                      onChange={handleFile} onClick={(event)=>{event.target.value=null}}/>
                  </label>

                  <Typography variant="display3" style={{display:isUploading ? 'block':'none'}}>
                    Uploading...
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={6} className={classes.item}>
            <Paper className={classes.paper}>
              <Typography variant="display1">
                RESULT
              </Typography>
              <div className={classes.result} style={{display:isComplete ? 'block':'none'}}>
                <Typography variant="headline">
                  Download
                </Typography>
                <a href={'https://swarm-gateways.net/bzz-raw:/'+hash} target='_blank'>https://swarm-gateways.net/bzz-raw:/{hash}</a>
                <img src={'https://swarm-gateways.net/bzz-raw:/'+hash} className={classes.image}/>
              </div>
            </Paper>
          </Grid>
        </Grid>
    );
}

export default withStyles(styles)(mainPage);