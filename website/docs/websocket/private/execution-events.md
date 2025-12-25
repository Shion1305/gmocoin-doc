# Execution Notifications

Receives latest execution events notifications. After subscribing, latest execution events notification will be sent.

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
| channel       | string | Required | executionEvents     |

### Example

```json
{
  "command": "subscribe",
  "channel": "executionEvents"
}
```

## Response Format

### Fields

| Property Name      | Value  | Description                                                                |
|--------------------|--------|----------------------------------------------------------------------------|
| channel            | string | executionEvents                                                            |
| orderId            | number | Order id                                                                   |
| executionId        | number | Execution id                                                               |
| symbol             | string | [The handling symbols](https://api.coin.z.com/docs/en/#symbols)           |
| settleType         | string | Settlement Type: OPEN/CLOSE                                                |
| executionType      | string | Execution Type: MARKET/LIMIT/STOP                                          |
| side               | string | Side: BUY/SELL                                                             |
| executionPrice     | string | Executed price                                                             |
| executionSize      | string | Executed quantity                                                          |
| positionId         | number | Position id (Margin trading only)                                          |
| orderTimestamp     | string | Ordered timestamp                                                          |
| executionTimestamp | string | Executed timestamp                                                         |
| lossGain           | string | Settlement profit/loss                                                     |
| fee                | string | Trade fee (It returns a positive value if Taker, a negative value if Maker.) |
| orderPrice         | string | Price of the order (It should be "0" if the order is MARKET.)             |
| orderSize          | string | Ordered size                                                               |
| orderExecutedSize  | string | Executed size of the order                                                 |
| timeInForce        | string | Time in force: FAK/FAS/FOK (SOK is Post-only order)                        |
| msgType            | string | Message Type: ER                                                           |

### Example Response

```json
{
  "channel": "executionEvents",
  "orderId": 123456789,
  "executionId": 72123911,
  "symbol": "BTC_JPY",
  "settleType": "OPEN",
  "executionType": "LIMIT",
  "side": "BUY",
  "executionPrice": "877404",
  "executionSize": "0.5",
  "positionId": 123456789,
  "orderTimestamp": "2019-03-19T02:15:06.081Z",
  "executionTimestamp": "2019-03-19T02:15:06.081Z",
  "lossGain": "0",
  "fee": "323",
  "orderPrice": "877200",
  "orderSize": "0.8",
  "orderExecutedSize": "0.7",
  "timeInForce": "FAS",
  "msgType": "ER"
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
        "channel": "executionEvents"
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
        "channel": "executionEvents"
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
        "channel": "executionEvents"
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
      :channel => "executionEvents"
    }
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    puts event.data
  end
}
```
