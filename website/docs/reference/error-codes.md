# Error Codes

This section explains all error codes that may be returned by the GMO Coin API.

## Overview

Error codes are returned in the response body when an API request fails. Each error code provides specific information about what went wrong.

### Error Response Format

```json
{
  "status": 5,
  "messages": [
    {
      "message_code": "ERR-xxxx",
      "message_string": "Error description"
    }
  ],
  "responsetime": "2025-12-25T12:00:00.123Z"
}
```

## Error Code Categories

### Trading and Position Errors (ERR-70 to ERR-846)

| Error Code | Category | Description |
|------------|----------|-------------|
| ERR-70     | Position | It will be returned when the BUY/SELL side of the specified position is incorrect in the settlement order. |
| ERR-189    | Position | The quantity of your close order exceeds your open position. |
| ERR-200    | Order    | There are existing active orders and your order exceeds the maximum quantity that can be ordered. Please change the quantity to order or cancel an active order in order to create a new close order. |
| ERR-201    | Balance  | Insufficient funds. |
| ERR-208    | Balance  | The quantity of your order exceeds your available balance. Please check your balance or active orders. |
| ERR-254    | Position | The specified position does not exist. |
| ERR-422    | Position | It will be returned when the specified position does not exist in the close bulk order. Please make sure that the symbol or side (BUY/SELL) is correct. |
| ERR-430    | Execution| Invalid parameter (orderId/executionId) in executions. |
| ERR-554    | System   | The server is unavailable. |
| ERR-626    | System   | The server is busy. Please retry later. |
| ERR-635    | Order    | The number of active orders has exceeded the limit. Please cancel an active order to create a new order. |
| ERR-682    | Margin   | A margin call has occurred. The operation cannot be executed. |
| ERR-683    | Margin   | Margin call processing is in progress. The operation cannot be executed. |
| ERR-754    | Transfer | Not enough transferable amount to transfer. |
| ERR-846    | Parameter| The difference between fromTimestamp and toTimestamp is greater than the maximum of 30 minutes. |

### Authentication Errors (ERR-5003 to ERR-5014)

| Error Code | Description |
|------------|-------------|
| ERR-5003   | The API usage limits are exceeded. |
| ERR-5007   | The API-TIMESTAMP is not set in the request header, or the value of API-TIMESTAMP is not a numeric value. Please ensure that the API-TIMESTAMP is set in the request header, and that the value is a numeric representation of a UNIX timestamp in milliseconds. |
| ERR-5008   | The API-TIMESTAMP set in the request header is later than the system time of the API. Please try updating the system time. |
| ERR-5009   | The API-TIMESTAMP set in the request header is earlier than the system time of the API. Please try updating the system time. |
| ERR-5010   | The API-SIGN (Signature) is invalid. Please check Authentication. |
| ERR-5011   | The API-KEY is empty. Please check Authentication. |
| ERR-5012   | The API authentication is invalid. |
| ERR-5014   | The membership agreement has not been completed. |

### Validation Errors (ERR-5106 to ERR-5135)

| Error Code | Description |
|------------|-------------|
| ERR-5106   | The request parameter is invalid. |
| ERR-5111   | Invalid timeInForce values. Please see the possible timeInForce values in Order, Close Order and Close Bulk Order. |
| ERR-5114   | The number of decimals exceeds the maximum precision. Please check the minimum order value. |
| ERR-5118   | Returned when LosscutPrice cannot be specified in the request body. |
| ERR-5121   | Impossible to order due to order price is too low. |
| ERR-5122   | The specified order can not be changed or canceled (already MODIFYING, CANCELLING, CANCELED, EXECUTED or EXPIRED). Orders can be changed or canceled only in ORDERED (WAITING for stop limit orders) status. |
| ERR-5123   | The specified order doesn't exist. |
| ERR-5125   | Returned when there is API restriction. |
| ERR-5126   | The amount exceeds the maximum order amount or is less than the minimum order amount. Please check the trading rules. |
| ERR-5127   | Your API connection is restricted. |
| ERR-5129   | Stop limit orders cannot be specified a price that will be executed immediately. |
| ERR-5133   | Account transfers are not possible due to transfer restrictions. |
| ERR-5135   | FxAccount not opened. Please try again after opening FxAccount. |

### System and Maintenance Errors (ERR-5201 to ERR-5208)

| Error Code | Description |
|------------|-------------|
| ERR-5201   | A response code that when Public/Private API is called while the service is in a regular maintenance. |
| ERR-5202   | A response code that when Public/Private API is called while the service is in an emergency maintenance. |
| ERR-5203   | A response code that when order or change order is called while the service is pre-open. |
| ERR-5204   | The request API PATH is invalid. |
| ERR-5206   | The limits of changing order for each order are exceeded. If you would like further changes for the order, please cancel the order and create a brand new order. |
| ERR-5207   | Invalid symbol, interval or date values. |
| ERR-5208   | OrderId(s) and executionId(s) cannot be used at the same time. |

## Common Error Scenarios

### Authentication Failed

**Error Code:** ERR-5012

**Possible Causes:**
- Invalid API key
- Invalid API signature
- Incorrect timestamp format

**Solution:**
Check your authentication implementation following the [Authentication Guide](../getting-started/authentication.md).

### Rate Limit Exceeded

**Error Code:** ERR-5003

**Possible Causes:**
- Too many requests in a short time period
- Exceeded tier limits

**Solution:**
Implement proper rate limiting in your application. See [Rate Limiting](../getting-started/rate-limiting.md) for details.

### Invalid Order Parameters

**Error Code:** ERR-5106 or ERR-5111 or ERR-5126

**Possible Causes:**
- Invalid order quantity
- Invalid price
- Invalid timeInForce value
- Symbol not supported

**Solution:**
Review the [Parameters Reference](./parameters.md) and check your order parameters.

### Insufficient Balance

**Error Code:** ERR-201 or ERR-208

**Possible Causes:**
- Not enough funds in account
- Balance locked in active orders

**Solution:**
Check your account balance and cancel unnecessary orders if needed.

### Order Cannot Be Modified

**Error Code:** ERR-5122

**Possible Causes:**
- Order is already being modified or cancelled
- Order has been executed
- Order has expired

**Solution:**
Check the order status before attempting to modify or cancel. Only orders with ORDERED status (or WAITING for stop limit orders) can be modified.

### Position Not Found

**Error Code:** ERR-254 or ERR-422

**Possible Causes:**
- Position ID doesn't exist
- Position has been closed
- Wrong symbol or side specified

**Solution:**
Verify the position ID and ensure the position is still open.

### System Unavailable

**Error Code:** ERR-554 or ERR-626 or ERR-5201 or ERR-5202

**Possible Causes:**
- Server maintenance
- System overload
- Temporary service disruption

**Solution:**
Wait and retry after a short delay. Check the GMO Coin status page for maintenance announcements.

## Error Handling Best Practices

### 1. Implement Retry Logic

For temporary errors (ERR-554, ERR-626), implement exponential backoff:

```javascript
async function retryableRequest(requestFn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (error.message_code === 'ERR-626' && i < maxRetries - 1) {
        await sleep(Math.pow(2, i) * 1000); // Exponential backoff
        continue;
      }
      throw error;
    }
  }
}
```

### 2. Validate Before Sending

Validate parameters locally before making API calls to avoid validation errors:

```javascript
function validateOrderParams(symbol, side, executionType, size) {
  if (!['BUY', 'SELL'].includes(side)) {
    throw new Error('Invalid side parameter');
  }
  if (!['MARKET', 'LIMIT', 'STOP'].includes(executionType)) {
    throw new Error('Invalid executionType parameter');
  }
  // Add more validations...
}
```

### 3. Handle Authentication Errors

For authentication errors, log and alert immediately:

```javascript
if (error.message_code.startsWith('ERR-50')) {
  console.error('Authentication error:', error);
  // Alert developer or check credentials
}
```

### 4. Log All Errors

Keep comprehensive error logs for debugging:

```javascript
function logError(error, context) {
  console.error({
    timestamp: new Date().toISOString(),
    errorCode: error.message_code,
    errorMessage: error.message_string,
    context: context
  });
}
```

## Related Documentation

- [Status Codes](./status-codes.md) - HTTP and GMO Coin status codes
- [Parameters](./parameters.md) - API parameter reference
- [Authentication](../getting-started/authentication.md) - Authentication setup
- [Rate Limiting](../getting-started/rate-limiting.md) - Rate limiting information
