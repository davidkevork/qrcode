import * as React from 'react';
import { hot } from 'react-hot-loader';
import QrReader from 'react-qr-reader';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CameraFront from '@material-ui/icons/CameraFront';
import CameraRear from '@material-ui/icons/CameraRear';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SelectAll from '@material-ui/icons/SelectAll';

interface IQrScannerState {
  isOpen: boolean;
  openSnackbar: boolean;
  errorMessage: string;
  result: string;
  facingMode: 'user' | 'environment';
}

interface IQrScannerProps {
  children: any;
}

class QrScanner extends React.Component<IQrScannerProps, IQrScannerState> {
  constructor(props: IQrScannerProps) {
    super(props);
    this.state = {
      isOpen: false,
      openSnackbar: false,
      errorMessage: '',
      result: '',
      facingMode: 'user',
    };
  }
  private readonly handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  private readonly handleScan = (data: string | null) => {
    if (data !== null) {
      this.setState({
        result: data,
      });
    }
  }
  // @ts-ignore
  private readonly handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  }
  private readonly handleError = (err: any) => {
    if (err.name) {
      this.setState({
        openSnackbar: true,
        errorMessage: err.message,
      });
    }
  }
  private readonly changeCamera = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({ facingMode: (this.state.facingMode === 'user' ? 'environment' : 'user') });
  }
  private readonly onCopy = () => {
    this.setState({
      openSnackbar: true,
      errorMessage: 'QRCode has been copied to clipboard',
    });
  }
  public render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.isOpen}
          maxWidth="sm"
          fullWidth={true}
          scroll="body"
          onBackdropClick={this.handleClick}
          onEscapeKeyDown={this.handleClick}
        >
          <DialogTitle>Scan QRCode</DialogTitle>
          <DialogContent dividers={true}>
            <QrReader
              delay={60}
              onError={this.handleError}
              onScan={this.handleScan}
              facingMode={this.state.facingMode}
              showViewFinder={false}
              style={{ marginButtom: '16px' }}
            />
            <FormControl fullWidth={true} margin="normal">
              <InputLabel htmlFor="qr-code">
                QRCode
              </InputLabel>
              <Input
                type="text"
                value={this.state.result}
                readOnly={true}
                endAdornment={
                  <InputAdornment position="end">
                    <CopyToClipboard text={this.state.result} onCopy={this.onCopy}>
                      <IconButton>
                        <SelectAll />
                      </IconButton>
                    </CopyToClipboard>
                  </InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={this.handleClick}>CLOSE</Button>
            <Button variant="outlined" color="primary" onClick={this.changeCamera}>
              {this.state.facingMode === 'user' ? <CameraFront /> : <CameraRear />}
            </Button>
          </DialogActions>
        </Dialog>
        <div onClick={this.handleClick}>{this.props.children}</div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.errorMessage}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </React.Fragment>
    );
  }
}

export default hot(module)(QrScanner);
