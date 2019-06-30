import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { hot } from 'react-hot-loader';
import HomeNav from '../HomeNav/HomeNav';
import QrScanner from '../QrScanner/QrScanner';
import QrGenerartor from '../QrGenerartor/QrGenerartor';

interface IQrIndexProps {
  classes: any;
  theme: any;
}

const styles = ({ palette }: { palette: any }) => ({
  containers: {
    padding: 16,
    width: '200px',
    height: '150px',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: palette.primary.light,
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class QrIndex extends React.Component<IQrIndexProps, {}> {
  constructor(props: IQrIndexProps) {
    super(props);
  }
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <HomeNav/>
        <Grid
          container={true}
          spacing={4}
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item={true} lg={3} md={4} sm={12} xs={12} className={classes.box}>
            <QrScanner>
              <Paper elevation={3} className={classes.containers}>
                <Typography variant="h5">Scan</Typography>
              </Paper>
            </QrScanner>
          </Grid>
          <Grid item={true} lg={3} md={4} sm={12} xs={12} className={classes.box}>
            <QrGenerartor>
              <Paper elevation={3} className={classes.containers}>
                <Typography variant="h5">Generate</Typography>
              </Paper>
            </QrGenerartor>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default hot(module)(withStyles(styles, { withTheme: true })(QrIndex));
