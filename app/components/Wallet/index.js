import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Dropdown } from 'semantic-ui-react';
<<<<<<< HEAD

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
=======
>>>>>>> 7c9791a1012aaba9988d7416957555fe9479a3b7

import Header from '../ContentPrimaryHeader';
import Wallet from './Wallet';

<<<<<<< HEAD

//import { loadTokenBalances } from '../../actions/wallet';
=======
import { tu } from '../../utils/i18n';
>>>>>>> 7c9791a1012aaba9988d7416957555fe9479a3b7

import { MoreIcon, WalletIcon, DownloadIcon } from '../Icons';
import styles from './WalletList.css';
import buttonStyles from '../Button.css';
<<<<<<< HEAD
import {initFromStorage} from "../../actions/wallet";
=======

const wallets = [
  {
    name: 'Personal Wallet',
    tokens: [
      { name: 'TRX', amount: '480 980.00' },
      { name: 'tkn1', amount: '452.00' },
      { name: 'tkn2', amount: '7 879.00' }
    ]
  },
];
>>>>>>> 7c9791a1012aaba9988d7416957555fe9479a3b7

class WalletList extends Component {

    componentDidMount() {
        this.props.initFromStorage(this.props);
    }

  render() {
    return (
      <div className={styles.container}>
        <Header className={styles.header} text="MY WALLETS :">
          <Dropdown icon={<MoreIcon />}>
            <Dropdown.Menu>
              <NavLink to="/wallets/create">
                <Dropdown.Item text="Create Wallet" icon={<WalletIcon />} />
              </NavLink>
              <Dropdown.Divider />
              <NavLink to="/wallets/import">
                <Dropdown.Item text="Import Wallet" icon={<DownloadIcon />} />
              </NavLink>
            </Dropdown.Menu>
          </Dropdown>
        </Header>
        <div className={styles.buttonContainer}>
          <NavLink to="/wallets/create">
            <Button className={`${buttonStyles.button} ${buttonStyles.gradient}`}>Create New Wallet</Button>
          </NavLink>
        </div>
        <div className={styles.walletContainer}>
          {
            this.props.wallet.persistent.wallets.map((wallet, i) =>
              // NavLink in Wallet Component
              <Wallet key={i} name={wallet.name} tokens={wallet.tokens} />)
          }
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
    state => ({ wallet: state.wallet }),
    dispatch => ( {
        initFromStorage: (props) => {
            dispatch(initFromStorage(props));
        }
    } )
)(WalletList));
