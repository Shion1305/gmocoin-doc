# Public API

The GMO Coin Public API provides access to real-time market data without requiring authentication.

## Available Endpoints

### Service Status
Get the current operational status of the GMO Coin exchange.

### Ticker
Retrieve current ticker information including latest prices, volumes, and price changes for trading pairs.

### Order Books
Access the current order book with bid and ask orders for all supported symbols.

### Trade History
Query recent trade executions and historical trading data.

### KLine Data
Fetch candlestick (KLine/OHLCV) data for technical analysis.

### Trade Rules
Get trading rules, minimum order sizes, and symbol information.

## Usage

All Public API endpoints are accessible via:

```
https://api.coin.z.com/public/v1/
```

No authentication is required for Public API endpoints.

## Rate Limiting

- Public API has minimal rate limiting to allow broad access
- Public WebSocket API: 1 request per second per IP address

## Code Examples

All endpoints include code examples in 10+ programming languages:
- Node.js
- Python
- Go
- Ruby
- PHP
- Kotlin
- C#
- Rust
- Haskell
- Swift

## Next Steps

Browse the sidebar to explore individual endpoints and their documentation.
