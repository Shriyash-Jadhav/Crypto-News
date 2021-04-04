import React, { Fragment } from 'react';

import axios from 'axios';

export default class Crypto extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    axios.get(`https://api.coinlore.net/api/tickers/`)
      .then(res => {
        console.log(res);
        this.setState({ data: res.data.data});
      })
  }
  convertNum = (labelValue) => {
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue));
  };
  render() {
    const Crypto = this.state.data.map((data, key) => (
      <tr key={key} className='t-1'>
        <td>{data.rank}</td>
        <td>{data.symbol}</td>
        <td>{data.name}</td>
        <td>{this.convertNum(data.volume24)}</td>

        <td>{this.convertNum(data.price_usd)}</td>

        <td>{this.convertNum (data.market_cap_usd)}</td>
        {data.percent_change_1h > 0 ? (
          <td style={{ color: '#66CD00	' }}>
            {data.percent_change_1h}&nbsp;&#8593;
          </td>
        ) : (
          <td style={{ color: 'red' }}>
            {data.percent_change_1h}&nbsp;&#8595;
          </td>
        )}
        {data.percent_change_24h > 0 ? (
          <td style={{ color: '#66CD00' }}>
            {data.percent_change_24h}&nbsp;&#8593;
          </td>
        ) : (
          <td style={{ color: 'red' }}>
            {data.percent_change_24h}&nbsp;&#8595;
          </td>
        )}
        {data.percent_change_7d > 0 ? (
          <td style={{ color: '#66CD00' }}>
            {data.percent_change_7d}&nbsp;&#8593;
          </td>
        ) : (
          <td style={{ color: 'red' }}>
            {data.percent_change_7d}&nbsp;&#8595;
          </td>
        )}
      </tr>
    ));
    return (
      <Fragment>
        <header className='text-center header'>
          <h1 className="head">Crypto-Coin</h1>
          <h4 className="tag">
          “I will tell you how to become rich. Close the doors. Be fearful when others are greedy. Be greedy when others are fearful.” – By Warren Buffett
          </h4>

        </header>
        <div className='row justify-content-center'>
          <table className='col-10 table'>
            <thead className='thead'>
              <tr>
                <th scope='col'>Rank</th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Name</th>
                <th scope='col'>24H Vol</th>
                <th scope='col'>Price($)</th>
                <th scope='col'>Market Cap</th>
                <th scope='col'>Change 1H</th>
                <th scope='col'>Change 24H</th>
                <th scope='col'>Change 7D</th>
              </tr>
            </thead>
            <tbody>{Crypto}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}