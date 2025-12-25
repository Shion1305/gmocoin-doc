# Position Summary Notifications

Receives latest position summary events notifications. After subscribing, latest position summary events notification will be sent.

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

| Property Name | Type   | Required | Available Values       |
|---------------|--------|----------|------------------------|
| command       | string | Required | subscribe/unsubscribe  |
| channel       | string | Required | positionSummaryEvents  |
| option        | string | Optional | PERIODIC               |

**Notes:**
- If `option` is specified as `PERIODIC`, it will send data every 5 seconds
- If you request multiple subscriptions, only the latest request will be valid

### Example

```json
{
  "command": "subscribe",
  "channel": "positionSummaryEvents"
}
```

### Example with Periodic Updates

```json
{
  "command": "subscribe",
  "channel": "positionSummaryEvents",
  "option": "PERIODIC"
}
```

## Response Format

### Fields

| Property Name       | Value  | Description                                                              |
|---------------------|--------|--------------------------------------------------------------------------|
| channel             | string | positionSummaryEvents                                                    |
| symbol              | string | [The handling margin symbols](https://api.coin.z.com/docs/en/#symbols)  |
| side                | string | Side: BUY/SELL                                                           |
| averagePositionRate | string | Average price of the position                                            |
| positionLossGain    | string | Settlement profit/loss                                                   |
| sumOrderQuantity    | string | Quantity of the order                                                    |
| sumPositionQuantity | string | Quantity of the position                                                 |
| timestamp           | string | Timestamp of the notifications                                           |
| msgType             | string | Message Type: INIT/UPDATE/PERIODIC                                       |

### Example Response

```json
{
  "channel": "positionSummaryEvents",
  "symbol": "BTC_JPY",
  "side": "BUY",
  "averagePositionRate": "1014484",
  "positionLossGain": "18",
  "sumOrderQuantity": "0.01",
  "sumPositionQuantity": "0.03",
  "timestamp": "2020-06-24T09:53:19.702Z",
  "msgType": "UPDATE"
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
        "channel": "positionSummaryEvents"
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
        "channel": "positionSummaryEvents"
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
        "channel": "positionSummaryEvents"
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
      :channel => "positionSummaryEvents"
    }
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    puts event.data
  end
}
```
