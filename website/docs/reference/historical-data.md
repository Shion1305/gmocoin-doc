# Historical Data

GMO Coin provides historical trading data that you can download for analysis and backtesting purposes.

## Overview

Historical data is available in CSV format and contains executed trade information. This data can be useful for:

- Market analysis
- Trading strategy backtesting
- Research and data science projects
- Compliance and record-keeping

## Accessing Historical Data

You can download the historical data (.CSV file) from:

**URL:** [https://api.coin.z.com/data/trades/](https://api.coin.z.com/data/trades/)

## Data Format

The historical data is provided in CSV (Comma-Separated Values) format, which can be easily imported into spreadsheet applications, databases, or data analysis tools.

### CSV Structure

The CSV files contain the following information for each trade:

| Field | Description |
|-------|-------------|
| Timestamp | Date and time when the trade was executed |
| Symbol | Trading pair (e.g., BTC_JPY, ETH_JPY) |
| Side | Buy or Sell |
| Price | Execution price |
| Size | Trade size/quantity |

### Example Data

```csv
timestamp,symbol,side,price,size
2025-12-25T12:00:00.123Z,BTC_JPY,BUY,5000000,0.1
2025-12-25T12:00:01.456Z,BTC_JPY,SELL,5000100,0.05
2025-12-25T12:00:02.789Z,ETH_JPY,BUY,350000,1.5
```

## Data Availability

### Time Range

Historical data is available from the inception of each trading pair. The data is continuously updated with new trades.

### Update Frequency

The historical data files are updated periodically. For real-time trading data, use the WebSocket API or REST API endpoints instead.

## Using Historical Data

### For Analysis

Historical data can be used with various analysis tools:

- **Python**: Use pandas for data analysis
  ```python
  import pandas as pd
  df = pd.read_csv('trades.csv')
  df['timestamp'] = pd.to_datetime(df['timestamp'])
  ```

- **Excel**: Import CSV directly into Microsoft Excel or Google Sheets

- **Databases**: Import into SQL databases for complex queries
  ```sql
  COPY trades FROM 'trades.csv' DELIMITER ',' CSV HEADER;
  ```

### For Backtesting

Use historical data to test trading strategies:

```python
import pandas as pd

# Load historical data
df = pd.read_csv('trades.csv', parse_dates=['timestamp'])

# Example: Calculate moving averages
df['price_ma_20'] = df['price'].rolling(window=20).mean()
df['price_ma_50'] = df['price'].rolling(window=50).mean()

# Implement your strategy
def backtest_strategy(df):
    # Your backtesting logic here
    pass
```

### For Research

Historical data provides valuable insights:

- Price trends and patterns
- Trading volume analysis
- Market volatility studies
- Correlation between different trading pairs

## Limitations

### Not for Real-Time Trading

Historical data is not suitable for real-time trading applications. For real-time data, use:

- [Public WebSocket API](../websocket/README.md) - For live market data
- [Public REST API](../public-api/README.md) - For current market information
- [Private WebSocket API](../websocket/README.md) - For live order and execution updates

### Data Accuracy

While GMO Coin strives to provide accurate historical data, always verify critical information through official API endpoints when making trading decisions.

## Alternative Data Sources

### REST API - Trades

For recent trade history with more control over the time range:

**Endpoint:** `GET /public/v1/trades`

**Parameters:**
- `symbol` (required): Trading symbol
- `page` (optional): Page number
- `count` (optional): Number of records per page

See [Trades API](../public-api/trades.md) for details.

### WebSocket API - Trades

For real-time trade notifications:

**Channel:** `trades`

**Symbol:** Specify the trading pair to subscribe to

See [WebSocket Trades](../websocket/public/trades.md) for details.

## Data Usage Guidelines

### Terms of Service

When using historical data:

1. Comply with GMO Coin's Terms of Service
2. Do not redistribute the data without permission
3. Use the data responsibly and ethically
4. Respect rate limits when accessing the download service

### Best Practices

1. **Download During Off-Peak Hours**: To avoid impacting service performance, download large datasets during off-peak hours

2. **Cache Locally**: Store downloaded data locally to avoid repeated downloads

3. **Incremental Updates**: Only download new data instead of the entire dataset each time

4. **Data Validation**: Verify data integrity after download
   ```python
   # Check for missing timestamps
   df['timestamp'] = pd.to_datetime(df['timestamp'])
   df = df.sort_values('timestamp')
   time_diff = df['timestamp'].diff()
   anomalies = time_diff[time_diff > pd.Timedelta(minutes=5)]
   ```

## Support

If you encounter issues with historical data:

1. Check the data file format and structure
2. Verify your download URL is correct
3. Ensure you have a stable internet connection
4. Contact GMO Coin support if problems persist

For API inquiries, please visit the [GMO Coin Support Center](https://support.coin.z.com/hc/ja/requests/new).

## Related Documentation

- [Public API - Trades](../public-api/trades.md) - Recent trade data via API
- [WebSocket - Trades](../websocket/public/trades.md) - Real-time trade notifications
- [Public API - Klines](../public-api/klines.md) - Historical candlestick data
- [Getting Started](../getting-started/introduction.md) - API basics and authentication
