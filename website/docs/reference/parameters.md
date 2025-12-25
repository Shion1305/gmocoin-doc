# Parameters

This section explains the parameters used in GMO Coin API requests and responses.

## Trading Symbols

### Spot Trading Symbols

| Value | Description                      | Release date |
|-------|----------------------------------|--------------|
| BTC   | Bitcoin (Spot trading)           | 2018/09/05   |
| ETH   | Ethereum (Spot trading)          | 2019/01/30   |
| BCH   | BitcoinCash (Spot trading)       | 2019/01/30   |
| LTC   | Litecoin (Spot trading)          | 2019/01/30   |
| XRP   | Ripple (Spot trading)            | 2019/01/30   |
| XLM   | Stellar (Spot trading)           | 2021/08/18   |
| XTZ   | Tezos (Spot trading)             | 2022/06/08   |
| DOT   | Polkadot (Spot trading)          | 2022/06/08   |
| ATOM  | Cosmos (Spot trading)            | 2022/06/08   |
| DAI   | Dai (Spot trading)               | 2022/07/13   |
| FCR   | FCR Coin (Spot trading)          | 2022/05/18   |
| ADA   | Cardano (Spot trading)           | 2022/07/13   |
| LINK  | Chainlink (Spot trading)         | 2022/07/13   |
| DOGE  | Dogecoin (Spot trading)          | 2023/08/05   |
| SOL   | Solana (Spot trading)            | 2023/08/05   |
| ASTR  | Astar (Spot trading)             | 2023/03/22   |
| NAC   | NOT A HOTEL COIN (Spot trading)  | 2024/12/13   |

### Margin Trading Symbols

| Value    | Description                               | Release date |
|----------|-------------------------------------------|--------------|
| BTC_JPY  | Bitcoin-Japanese Yen (Margin trading)     | 2018/09/05   |
| ETH_JPY  | Ethereum-Japanese Yen (Margin trading)    | 2019/01/30   |
| BCH_JPY  | BitcoinCash-Japanese Yen (Margin trading) | 2019/01/30   |
| LTC_JPY  | Litecoin-Japanese Yen (Margin trading)    | 2019/01/30   |
| XRP_JPY  | Ripple-Japanese Yen (Margin trading)      | 2019/01/30   |
| DOT_JPY  | Polkadot-Japanese Yen (Margin trading)    | 2024/04/13   |
| ATOM_JPY | Cosmos-Japanese Yen (Margin trading)      | 2024/04/13   |
| ADA_JPY  | Cardano-Japanese Yen (Margin trading)     | 2024/04/13   |
| LINK_JPY | Chainlink-Japanese Yen (Margin trading)   | 2024/04/13   |
| DOGE_JPY | Dogecoin-Japanese Yen (Margin trading)    | 2024/04/13   |
| SOL_JPY  | Solana-Japanese Yen (Margin trading)      | 2024/04/13   |

### Asset Ticker Symbols

| Value | Description                    |
|-------|--------------------------------|
| JPY   | Japanese Yen                   |
| BTC   | Bitcoin (OTC Spot)             |
| ETH   | Ethereum (OTC Spot)            |
| BCH   | BitcoinCash (OTC Spot)         |
| LTC   | Litecoin (OTC Spot)            |
| XRP   | Ripple (OTC Spot)              |
| XLM   | Stellar Lumens (OTC Spot)      |
| OMG   | OMG                            |
| XTZ   | Tezos (OTC Spot)               |
| DOT   | Polkadot (OTC Spot)            |
| ATOM  | Cosmos (OTC Spot)              |
| MKR   | Maker                          |
| DAI   | Dai (OTC Spot)                 |
| FCR   | FCR Coin (Exchange)            |
| ADA   | Cardano (OTC Spot)             |
| LINK  | Chainlink (OTC Spot)           |
| DOGE  | Dogecoin (OTC Spot)            |
| SOL   | Solana (OTC Spot)              |
| FLR   | FLARE                          |
| ASTR  | Astar (Exchange)               |
| FIL   | Filecoin (OTC Spot)            |
| SAND  | The Sandbox (OTC Spot)         |
| CHZ   | Chiliz (OTC Spot)              |
| NAC   | NOT A HOTEL COIN (Exchange)    |
| AVAX  | AVAX (OTC Spot)                |

## Order Parameters

### side: Side

| Value | Description |
|-------|-------------|
| BUY   | Buy         |
| SELL  | Sell        |

### executionType: Execution Type

| Value  | Description      |
|--------|------------------|
| MARKET | Market order     |
| LIMIT  | Limit order      |
| STOP   | Stop limit order |

### timeInForce: Time in Force

| Value | Description                                                                                         |
|-------|-----------------------------------------------------------------------------------------------------|
| FAK   | Fill and kill. When an order can only be partially executed and its remaining part expires.         |
| FAS   | Fill and store. When an order can only be partially executed and its remaining part is still valid. |
| FOK   | Fill or kill. If an order is not executed immediately, the order will expire.                       |
| SOK   | Store or kill. If a limit order is not maker, the order will expire. (Post-only order)              |

### settlePosition

Used in margin trading to specify position settlement parameters.

## SOK (Post-Only) Support

Symbols for which SOK (Post-Only) can be specified in the timeInForce parameter:

| Service        | Description                                                      |
|----------------|------------------------------------------------------------------|
| Spot Trading   | All symbols can be specified                                     |
| Margin Trading | BTC_JPY, DOT_JPY, ATOM_JPY, ADA_JPY, LINK_JPY, DOGE_JPY, SOL_JPY |

## Related Documentation

- [Public API Endpoints](../public-api/README.md)
- [Private API Endpoints](../private-api/README.md)
- [Status Codes](./status-codes.md)
- [Error Codes](./error-codes.md)
