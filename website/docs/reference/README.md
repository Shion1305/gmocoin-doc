# API Reference

This section contains reference documentation for GMO Coin API parameters, status codes, error codes, and other technical specifications.

## Contents

### [Parameters Reference](./parameters.md)

Detailed specifications for all API parameters including:
- Symbol formats and trading pairs (Spot, Margin, and Asset symbols)
- Order parameters (side, executionType, timeInForce, settlePosition)
- SOK (Post-Only) supported symbols
- Complete list of all available trading pairs with release dates

### [Status Codes](./status-codes.md)

HTTP status codes and GMO Coin-specific status codes:
- HTTP status codes (200, 400, 401, 404, 429, 500, 503)
- GMO Coin status codes (0 = success, 5 = error)
- Response format examples
- Status code usage guidelines

### [Error Codes](./error-codes.md)

Comprehensive list of error codes and their meanings:
- Authentication errors (ERR-5003 to ERR-5014)
- Validation errors (ERR-5106 to ERR-5135)
- Trading and position errors (ERR-70 to ERR-846)
- System and maintenance errors (ERR-5201 to ERR-5208)
- Error handling best practices
- Common error scenarios and solutions

### [Historical Data](./historical-data.md)

Information about historical trading data:
- CSV format download access
- Data structure and fields
- Usage examples for analysis and backtesting
- Alternative real-time data sources
- Best practices for data usage

### Special Parameters

- **SOK (Post-Only) Support**: Symbols that support Post-Only orders
- **Timestamp Formats**: Unix timestamp in milliseconds
- **Signature Generation**: HMAC-SHA256 signature process

## Response Format

All API responses follow this general structure:

```json
{
  "status": 0,
  "data": {
    // Response data
  },
  "responsetime": "2025-12-25T12:00:00.000Z"
}
```

### Error Response Format

```json
{
  "status": 5,
  "messages": [
    {
      "message_code": "ERR-XXXX",
      "message_string": "Error description"
    }
  ],
  "responsetime": "2025-12-25T12:00:00.000Z"
}
```

## Data Types

- **String**: Text values (symbols, timestamps, etc.)
- **Number**: Numeric values (prices, quantities, etc.)
- **Boolean**: true/false values
- **Array**: Lists of items
- **Object**: Nested data structures

## Timezone

All timestamps are in **UTC** unless otherwise specified.

## Next Steps

Browse the sidebar for detailed reference documentation on specific topics.
