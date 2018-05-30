import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './TxList.css';
import Transaction from './Transaction';
import { updateTransactions } from '../../../actions/wallet';

const TronHttpClient = require('tron-http-client');

const client = new TronHttpClient();

class TxList extends Component {
  async componentDidMount() {
    let accountId = this.props.match.params.account;
    let address = this.props.wallet.persistent.accounts[accountId].publicKey;
    let transactions = await client.getTransactionsRelatedToThis(address);

    let cleanedTransactions = [];
    for (let i = 0; i < transactions.length; i++) {
      let transaction = transactions[i];

      let newTransaction = {
        ...transaction,
        amount: transaction.amount,
        date: transaction.timestamp,
        type: (transaction.owner_address === address) ? 1 : 0,
        asset: (transaction.asset_name) ? transaction.asset_name : 'TRX',
      };

      if (transactions[i].contract_desc === 'TransferContract' ||
        transactions[i].contract_desc === 'ParticipateAssetIssueContract' ||
        transactions[i].contract_desc === 'TransferAssetContract') {
        cleanedTransactions.push(newTransaction);
      }
    }

    this.props.updateTransactions(accountId, cleanedTransactions);
  }

  render() {
    let accountId = this.props.match.params.account;
    let transactions = this.props.wallet.persistent.accounts[accountId].transactions;
    let filteredTransactions = [];

    let highlightedToken = this.props.match.params.token;
    if (highlightedToken) {
      if (highlightedToken === 'TRX') {
        for (let i = 0; i < transactions.length; i++) {
          let transaction = transactions[i];
          if (transaction.contract_desc === 'TransferContract') {
            filteredTransactions.push(transaction);
          }
        }
      } else {
        for (let i = 0; i < transactions.length; i++) {
          let transaction = transactions[i];
          if ((transaction.contract_desc === 'ParticipateAssetIssueContract' ||
            transaction.contract_desc === 'TransferAssetContract') &&
            transaction.asset === highlightedToken) {
            filteredTransactions.push(transaction);
          }
        }
      }
    } else {
      filteredTransactions = transactions;
    }

    return (
      <div className={styles.txList}>
        {
          filteredTransactions.map((tx, i) =>
            <Transaction
              key={i}
              txID={tx._id}
              amount={tx.amount}
              date={tx.date}
              type={tx.type}
              asset={tx.asset}
              contract_desc={tx.contract_desc}
            />)
        }
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({ wallet: state.wallet }),
  dispatch => ({
    updateTransactions: (accountId, transactions) => {
      dispatch(updateTransactions(accountId, transactions));
    }
  })
)(TxList));
