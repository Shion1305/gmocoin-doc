# Position Notifications

Receives latest position events notifications. After subscribing, latest position events notification will be sent.

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
| channel       | string | Required | positionEvents      |

### Example

```json
{
  "command": "subscribe",
  "channel": "positionEvents"
}
```

## Response Format

### Fields

| Property Name | Value  | Description                                                              |
|---------------|--------|--------------------------------------------------------------------------|
| channel       | string | positionEvents                                                           |
| positionId    | number | Position id                                                              |
| symbol        | string | [The handling margin symbols](https://api.coin.z.com/docs/en/#symbols)  |
| side          | string | Side: BUY/SELL                                                           |
| size          | string | Quantity of the position                                                 |
| orderdSize    | string | Quantity of the order                                                    |
| price         | string | Price of the position                                                    |
| lossGain      | string | Settlement profit/loss                                                   |
| leverage      | string | Leverage                                                                 |
| losscutPrice  | string | Margin Liquidation                                                       |
| timestamp     | string | Executed timestamp                                                       |
| msgType       | string | Message Type: OPR/UPR/ULR/CPR                                            |

### Example Response

```json
{
  "channel": "positionEvents",
  "positionId": 1234567,
  "symbol": "BTC_JPY",
  "side": "BUY",
  "size": "0.22",
  "orderdSize": "0",
  "price": "876045",
  "lossGain": "14",
  "leverage": "4",
  "losscutPrice": "766540",
  "timestamp": "2019-03-19T02:15:06.094Z",
  "msgType": "OPR"
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
        "channel": "positionEvents"
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
        "channel": "positionEvents"
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
        "channel": "positionEvents"
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
      :channel => "positionEvents"
    }
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    puts event.data
  end
}
```
