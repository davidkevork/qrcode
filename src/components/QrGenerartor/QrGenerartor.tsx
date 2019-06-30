import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { hot } from 'react-hot-loader';
import QRCode from 'qrcode.react';

interface IQrGeneratorState {
  isOpen: boolean;
  value: string;
}

interface IQrGeneratorProps {
  children: any;
}

class QrGenerator extends React.Component<IQrGeneratorProps, IQrGeneratorState> {
  constructor(props: IQrGeneratorProps) {
    super(props);
    this.state = {
      isOpen: false,
      value: '',
    };
  }
  private readonly handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  private readonly handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  }
  public render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.isOpen}
          maxWidth="xs"
          fullWidth={true}
          scroll="body"
          onBackdropClick={this.handleClick}
          onEscapeKeyDown={this.handleClick}
        >
          <DialogTitle>Scan QRCode</DialogTitle>
          <DialogContent dividers={true}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/*
              // @ts-ignore */}
              <QRCode
                value={this.state.value}
                size={220}
                level="H"
                bgColor="#98DBC6"
                includeMargin={true}
              />
            </div>
            <TextField
              id="qrText"
              label="Qr Code"
              margin="normal"
              type="text"
              fullWidth={true}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={this.handleClick}>CLOSE</Button>
          </DialogActions>
        </Dialog>
        <div onClick={this.handleClick}>{this.props.children}</div>
      </React.Fragment>
    );
  }
}

export default hot(module)(QrGenerator);
