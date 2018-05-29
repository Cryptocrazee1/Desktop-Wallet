import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Token.css';

import TokenProgressBar from './TokenProgressBar';

class Token extends Component {
  render() {
    return (
      <NavLink to={"/tokens/tokenDetails/" + this.props.index} className={styles.token}>
        <div className={styles.topBar}>
          <div className={styles.tokenName}>{this.props.tokenName}</div>
          {this.props.tokenURL ? <a src={this.props.tokenURL}>View Website</a> : <div className={styles.filler}></div>}
        </div>
        <TokenProgressBar
          className={styles.tokenBar}
          tokenCurrent={this.props.totalIssued}
          tokenMax={this.props.totalSupply}
          endTime={this.props.endTime}
        />
      </NavLink>
    );
  }
}

export default Token;
