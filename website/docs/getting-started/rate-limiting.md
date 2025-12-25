# API Rate Limiting

GMO Coin implements rate limiting to ensure fair usage and system stability. Understanding these limits is crucial for building reliable applications.

## Overview

API usage limits vary depending on the API type and your trading volume.

## Public API Limiting

Public APIs have minimal rate limiting to allow broad access to market data.

### Public WebSocket API

- **Limit**: 1 request (subscribe/unsubscribe) per second
- **Scope**: Per IP address
- **Actions**: Subscribe and unsubscribe to channels

## Private API Limiting

Private API limits are tier-based and determined by your previous week's trading volume.

### Tiered Rate Limits

| Level | Trading Volume (Previous Week) | API Limit | Description |
|-------|-------------------------------|-----------|-------------|
| **Tier 1** | < 1,000,000,000 yen | 20 req/s | Maximum 20 GET requests per second<br/>Maximum 20 POST requests per second |
| **Tier 2** | ≥ 1,000,000,000 yen | 30 req/s | Maximum 30 GET requests per second<br/>Maximum 30 POST requests per second |

### Important Notes

- **Trading Volume Calculation**:
  - Includes both spot trading and margin trading on the exchange
  - Data collected between past Sunday 6:00 AM and current Sunday 5:59 AM JST

- **Tier Updates**:
  - Tiers are updated every Sunday between 6:00 - 6:30 AM JST
  - Based on the previous week's trading activity

- **Subject to Change**:
  - Private API limits may be adjusted without prior notice
  - Monitor official announcements for any changes

### IP Restrictions

For enhanced security, you can enable IP restriction features:

- Configure allowed IP addresses via the membership site
- API calls from non-registered IPs will be **denied**
- Applies to both REST and WebSocket APIs

### Permission-Based Access

- Only features specified when issuing the API key can be called
- Set permissions during API key creation
- Cannot access endpoints without proper permissions

## Private WebSocket API Limiting

- **Limit**: 1 request (subscribe/unsubscribe) per second
- **Scope**: Per IP address
- **IP Restrictions**: Same as Private API
- **Permissions**: Only subscriptions for features enabled at API key creation time

## Additional Restrictions

GMO Coin reserves the right to restrict API usage in the following scenarios:

### Automatic Rate Limiting

- Triggered when the entire system experiences overload
- Helps maintain system stability for all users
- Temporary restrictions applied automatically

### Excessive Usage

- When user's API usage may be causing system overload
- Applies to both legitimate and problematic usage patterns

### Intentional Overload

- Users repeatedly placing orders to intentionally overload the system
- May result in permanent API access restriction
- Violates terms of service

## Best Practices

To avoid rate limiting issues:

1. **Implement Exponential Backoff**: When you receive rate limit errors, wait progressively longer before retrying

2. **Cache Responses**: Store frequently accessed data locally to reduce API calls

3. **Use WebSocket for Real-time Data**: Instead of polling REST endpoints, use WebSocket subscriptions

4. **Batch Operations**: When possible, use bulk endpoints instead of individual calls

5. **Monitor Your Usage**: Keep track of your API call frequency to stay within limits

## Rate Limit Error Response

When you exceed rate limits, you'll receive an HTTP error response:

```json
{
  "status": 5,
  "messages": [
    {
      "message_code": "ERR-5201",
      "message_string": "TEMPORARY_UNAVAILABLE Rate limit exceeded"
    }
  ]
}
```

## Increasing Your Rate Limits

To increase your Private API rate limits:

1. Increase your trading volume on the GMO Coin exchange
2. Trade consistently to maintain higher tiers
3. Trading volume is calculated weekly
4. Tier updates occur every Sunday morning (JST)

---

## Next Steps

- [Start Building with Public API](../public-api/)
- [Learn about Private API](../private-api/)
- [Explore WebSocket API](../websocket/)
