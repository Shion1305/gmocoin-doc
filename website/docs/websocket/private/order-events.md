# Order Notifications

Receives latest order events notifications. After subscribing, latest order events notification will be sent.

## WebSocket Endpoint

```
wss://api.coin.z.com/ws/private/v1/{ACCESS_TOKEN}
```

Replace `{ACCESS_TOKEN}` with your access token obtained from the [authentication endpoint](./authentication.md).

## Connection Details

- A ping will be sent from the server to a client once per minute
- If there's no response (pong) from a client 3 consecutive times, the WebSocket will be disconnected automatically
- Requires a valid access token for authentication

## Subscribe Message

### Parameters

Parameter type: JSON

| Property Name | Type   | Required | Available Values    |
|---------------|--------|----------|---------------------|
| command       | string | Required | subscribe/unsubscribe |
| channel       | string | Required | orderEvents         |

### Example

```json
{
  "command": "subscribe",
  "channel": "orderEvents"
}
```

## Response Format

### Fields

| Property Name     | Value  | Description                                                                |
|-------------------|--------|----------------------------------------------------------------------------|
| channel           | string | orderEvents                                                                |
| orderId           | number | Order id                                                                   |
| symbol            | string | [The handling symbols](https://api.coin.z.com/docs/en/#symbols)           |
| settleType        | string | Settlement Type: OPEN/CLOSE/LOSS_CUT                                       |
| executionType     | string | Execution Type: MARKET/LIMIT/STOP                                          |
| side              | string | Side: BUY/SELL                                                             |
| orderStatus       | string | Order Status: WAITING/ORDERED/CANCELED/EXPIRED (WAITING is valid for stop limit orders.) |
| cancelType        | string | Cancel Type (returned if orderStatus is CANCELED or EXPIRED): USER/POSITION_LOSSCUT/INSUFFICIENT_BALANCE/INSUFFICIENT_MARGIN/ACCOUNT_LOSSCUT/MARGIN_CALL/MARGIN_CALL_LOSSCUT/EXPIRED_FAK/EXPIRED_FOK/EXPIRED_SOK/EXPIRED_SELFTRADE/CLOSED_ORDER OR (returned if orderStatus is ORDERED): SOK_TAKER/PRICE_LIMIT |
| orderTimestamp    | string | Ordered timestamp                                                          |
| orderPrice        | string | Price of the order (It should be "0" if the order is MARKET.)             |
| orderSize         | string | Ordered size                                                               |
| orderExecutedSize | string | Executed size of the order                                                 |
| losscutPrice      | string | Margin Liquidation (It should be "0" if the order is Spot trading or losscutPrice is not set.) |
| timeInForce       | string | Time in force: FAK/FAS/FOK (SOK is Post-only order)                        |
| msgType           | string | Message Type: NOR/ROR/COR/ER                                               |

### Example Response

```json
{
  "channel": "orderEvents",
  "orderId": 123456789,
  "symbol": "BTC_JPY",
  "settleType": "OPEN",
  "executionType": "LIMIT",
  "side": "BUY",
  "orderStatus": "CANCELED",
  "cancelType": "USER",
  "orderTimestamp": "2019-03-19T02:15:06.081Z",
  "orderPrice": "876045",
  "orderSize": "0.8",
  "orderExecutedSize": "0",
  "losscutPrice": "0",
  "timeInForce": "FAS",
  "msgType": "NOR"
}
```

**Note:** There is no Response when unsubscribe is requested.

## Code Examples

### JavaScript (Node.js)

```javascript
const WebSocket = require("ws");
const ws = new WebSocket("wss://api.coin.z.com/ws/private/v1/xxxxxxxxxxxxxxxxxxxx");

ws.on("open", () => {
    const message = JSON.stringify({
        "command": "subscribe",
        "channel": "orderEvents"
    });
    ws.send(message);
});

ws.on("message", (data) => {
    console.log("WebSocket message: ", data);
});
```

### Python

```python
import json
import websocket

websocket.enableTrace(True)
ws = websocket.WebSocketApp('wss://api.coin.z.com/ws/private/v1/xxxxxxxxxxxxxxxxxxxx')

def on_open(self):
    message = {
        "command": "subscribe",
        "channel": "orderEvents"
    }
    ws.send(json.dumps(message))

def on_message(self, message):
    print(message)

ws.on_open = on_open
ws.on_message = on_message

ws.run_forever()
```

### Go

```go
package main

import (
    "fmt"
    "golang.org/x/net/websocket"
    "encoding/json"
    "bytes"
)

func main() {
    wsUrl := "wss://api.coin.z.com/ws/private/v1/xxxxxxxxxxxxxxxxxxxx"
    origin := "https://api.coin.z.com"
    sendMsg := (`{
        "command": "subscribe",
        "channel": "orderEvents"
    }`)
    var receiveMsg string

    ws, _ := websocket.Dial(wsUrl, "", origin)
    websocket.Message.Send(ws, sendMsg)
    for {
        websocket.Message.Receive(ws, &receiveMsg)
        var buf bytes.Buffer
        json.Indent(&buf, []byte(receiveMsg), "", "  ")
        fmt.Println(buf.String())
    }
}
```

### Ruby

```ruby
require "faye/websocket"
require "eventmachine"
require 'json'

EM.run {
  ws = Faye::WebSocket::Client.new("wss://api.coin.z.com/ws/private/v1/xxxxxxxxxxxxxxxxxxxx")

  ws.on :open do |event|
    message = {
      :command => "subscribe",
      :channel => "orderEvents"
    }
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    puts event.data
  end
}
```
