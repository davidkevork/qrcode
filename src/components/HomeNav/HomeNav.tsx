import React from 'react';
import { hot } from 'react-hot-loader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import QrScanner from '../QrScanner/QrScanner';
import QrGenerartor from '../QrGenerartor/QrGenerartor';
import './HomeNav.scss';

interface IHomeNavState {
  readonly isOpen: boolean;
}

class HomeNav extends React.Component<{}, IHomeNavState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  private readonly toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  public render() {
    return (
      <AppBar position="static" className="appbar">
        <Toolbar className="nav-wrapper">
          <div>
            <Icon onClick={this.toggleMenu} className="iconButton" aria-label="Menu">
              <MenuIcon />
            </Icon>
          </div>
          <MenuList className="menuMain">
            <MenuItem disableRipple={true} disableTouchRipple={true}>
              <QrScanner>Scan</QrScanner>
            </MenuItem>
            <MenuItem disableRipple={true} disableTouchRipple={true}>
              <QrGenerartor>Generate</QrGenerartor>
            </MenuItem>
          </MenuList>
          <SwipeableDrawer
            open={this.state.isOpen}
            onOpen={this.toggleMenu}
            onClose={this.toggleMenu}
          >
            <MenuList className="menuMobile">
              <MenuItem disableRipple={true} disableTouchRipple={true}>
                <QrScanner>Scan</QrScanner>
              </MenuItem>
              <Divider />
              <MenuItem disableRipple={true} disableTouchRipple={true}>
                <QrGenerartor>Generate</QrGenerartor>
              </MenuItem>
            </MenuList>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }
}

export default hot(module)(HomeNav);
