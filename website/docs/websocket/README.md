# WebSocket API

The GMO Coin WebSocket API provides real-time streaming data for both public market information and private account updates.

## Benefits of WebSocket API

- **Low Latency**: Real-time updates without polling
- **Efficient**: Reduced bandwidth compared to REST API polling
- **Event-Driven**: Receive notifications as events occur
- **Persistent Connection**: Single connection for multiple data streams

## Public WebSocket API

Access real-time market data without authentication.

### Base URL

```
wss://api.coin.z.com/ws/public/v1
```

### Available Channels

- **Ticker**: Real-time price updates
- **Order Books**: Live order book updates
- **Trades**: Trade execution notifications

### Rate Limiting

- 1 request (subscribe/unsubscribe) per second per IP address

## Private WebSocket API

Access real-time account and trading updates with authentication.

### Base URL

```
wss://api.coin.z.com/ws/private/v1
```

### Authentication

1. Create an access token using the Private API
2. Use the token to establish WebSocket connection
3. Token can be extended or deleted as needed

See [Authentication](../getting-started/authentication.md) for details.

### Available Channels

- **Execution Events**: Real-time trade execution notifications
- **Order Events**: Order status change notifications
- **Position Events**: Position update notifications
- **Position Summary Events**: Aggregated position change notifications

### Rate Limiting

- 1 request (subscribe/unsubscribe) per second per IP address
- IP restrictions from membership site apply
- Only subscriptions for features enabled at API key creation

## Connection Management

### Subscribe

```json
{
  "command": "subscribe",
  "channel": "ticker",
  "symbol": "BTC"
}
```

### Unsubscribe

```json
{
  "command": "unsubscribe",
  "channel": "ticker",
  "symbol": "BTC"
}
```

## Best Practices

1. **Handle Reconnections**: Implement automatic reconnection logic
2. **Heartbeat/Ping**: Keep connection alive with periodic pings
3. **Error Handling**: Gracefully handle disconnections and errors
4. **Subscription Management**: Track active subscriptions
5. **Message Buffering**: Handle bursts of messages appropriately

## Next Steps

Browse the sidebar to explore WebSocket channels:
- Public WebSocket channels
- Private WebSocket channels and authentication
