# Private API

The GMO Coin Private API provides authenticated access to account management, trading, and order management features.

## Authentication Required

All Private API endpoints require authentication using:
- **API-KEY**: Your API key
- **API-TIMESTAMP**: Request timestamp in milliseconds
- **API-SIGN**: HMAC-SHA256 signature

See the [Authentication Guide](../getting-started/authentication.md) for detailed implementation examples.

## Available Endpoints

### Account Management
- **Margin**: Query available margin and leverage information
- **Assets**: View account balances and asset holdings
- **Trading Volume**: Check your trading volume statistics
- **Deposit History**: View fiat and cryptocurrency deposit history
- **Withdrawal History**: View fiat and cryptocurrency withdrawal history

### Order Management
- **Orders**: Query order history
- **Active Orders**: View currently open orders
- **Executions**: Get trade execution history
- **Latest Executions**: Query recent trade executions
- **Create Order**: Place new orders (market, limit, stop)
- **Change Order**: Modify existing orders
- **Cancel Order**: Cancel a single order
- **Cancel Orders**: Cancel multiple orders
- **Cancel Bulk Order**: Bulk order cancellation

### Position Management
- **Open Positions**: View current open positions
- **Position Summary**: Get aggregated position information
- **Close Order**: Close a position
- **Close Bulk Order**: Close multiple positions
- **Change Margin Liquidation**: Modify liquidation settings

### Transfers
- **Transfer**: Move funds between accounts

## Base URL

```
https://api.coin.z.com/private/v1/
```

## Rate Limiting

Private API rate limits are tier-based:

| Tier | Trading Volume | Rate Limit |
|------|----------------|------------|
| Tier 1 | < 1B yen/week | 20 req/s |
| Tier 2 | ≥ 1B yen/week | 30 req/s |

See [Rate Limiting](../getting-started/rate-limiting.md) for complete details.

## Security Best Practices

1. Never share your API secret key
2. Enable IP restrictions when possible
3. Grant minimum required permissions
4. Rotate API keys regularly
5. Store credentials securely (environment variables, vaults)

## Next Steps

Browse the sidebar to explore individual endpoints organized by category:
- Account
- Orders
- Positions
