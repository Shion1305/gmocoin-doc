# API Endpoints

GMO Coin provides four main API endpoints for different purposes.

## Base URLs

### Public API
```
https://api.coin.z.com/public
```

Access market data without authentication:
- Service status
- Ticker information
- Order books
- Trade history
- KLine (candlestick) data
- Trade rules and symbols

### Public WebSocket API
```
wss://api.coin.z.com/ws/public
```

Real-time streaming of public market data:
- Live ticker updates
- Order book updates
- Trade notifications

### Private API
```
https://api.coin.z.com/private
```

Authenticated access to account and trading features:
- Account information (margin, assets, trading volume)
- Deposit and withdrawal history
- Order management (create, modify, cancel)
- Position management
- Trade execution history

### Private WebSocket API
```
wss://api.coin.z.com/ws/private
```

Real-time streaming of private account data:
- Order notifications
- Execution notifications
- Position updates
- Position summary updates

## API Version

Current version: **v1**

All endpoints use the `/v1/` path prefix. For example:
- Public: `https://api.coin.z.com/public/v1/ticker`
- Private: `https://api.coin.z.com/private/v1/account/margin`

## Next Steps

- [Learn about Authentication](./authentication.md)
- [Understand Rate Limiting](./rate-limiting.md)
- [Browse Public API Documentation](../public-api/)
- [Browse Private API Documentation](../private-api/)
