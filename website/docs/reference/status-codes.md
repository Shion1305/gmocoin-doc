# Status Codes

This section explains the HTTP status codes and GMO Coin-specific status codes returned by the API.

## HTTP Status Codes

HTTP status codes indicate the result of the HTTP request itself.

| Status Code | Description                                                                            |
|-------------|----------------------------------------------------------------------------------------|
| 200         | A response for successful HTTP requests.                                               |
| 400         | Bad request. The request was invalid or cannot be served.                              |
| 401         | Unauthorized. Authentication failed or user does not have permissions.                 |
| 404         | A response for when requested URL is invalid.                                          |
| 429         | Too many requests. Rate limit exceeded.                                                |
| 500         | Internal server error. Something went wrong on the server side.                        |
| 503         | A response code that when WebSocket API is called while the service is in maintenance. |

## GMO Coin Status Codes

GMO Coin status codes are included in the API response body to indicate the result of API processing.

| Status Code | Description                               |
|-------------|-------------------------------------------|
| 0           | A response for successful API processing. |
| 5           | API processing failed. Check error codes for details. |

### Response Format

When an API request is successful, the response will include:

```json
{
  "status": 0,
  "data": { ... },
  "responsetime": "2025-12-25T12:00:00.123Z"
}
```

When an API request fails, the response will include:

```json
{
  "status": 5,
  "messages": [
    {
      "message_code": "ERR-5xxx",
      "message_string": "Error description"
    }
  ],
  "responsetime": "2025-12-25T12:00:00.123Z"
}
```

## Status Code Examples

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": 0,
  "data": {
    "symbol": "BTC",
    "amount": "0.1"
  },
  "responsetime": "2025-12-25T12:00:00.123Z"
}
```

### Error Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": 5,
  "messages": [
    {
      "message_code": "ERR-5106",
      "message_string": "The request parameter is invalid."
    }
  ],
  "responsetime": "2025-12-25T12:00:00.123Z"
}
```

### HTTP Error Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "status": 5,
  "messages": [
    {
      "message_code": "ERR-5012",
      "message_string": "The API authentication is invalid."
    }
  ],
  "responsetime": "2025-12-25T12:00:00.123Z"
}
```

## Related Documentation

- [Error Codes](./error-codes.md) - Detailed error code descriptions
- [Authentication](../getting-started/authentication.md) - API authentication setup
- [Rate Limiting](../getting-started/rate-limiting.md) - Rate limiting information
