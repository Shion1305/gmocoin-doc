# Order Books

Gets an order book (snapshot) of the specified symbol. After subscribing, order books start to be sent.

## WebSocket Endpoint

```
wss://api.coin.z.com/ws/public/v1
```

## Connection Details

- A ping will be sent from the server to a client once per minute
- If there's no response (pong) from a client 3 consecutive times, the WebSocket will be disconnected automatically

## Subscribe Message

### Parameters

Parameter type: JSON

| Property Name | Type   | Required | Available Values    |
|---------------|--------|----------|---------------------|
| command       | string | Required | subscribe/unsubscribe |
| channel       | string | Required | orderbooks          |
| symbol        | string | Required | [The handling symbols](https://api.coin.z.com/docs/en/#symbols) |

### Example

```json
{
  "command": "subscribe",
  "channel": "orderbooks",
  "symbol": "BTC"
}
```

## Response Format

### Fields

| Property Name | Value  | Description                                             |
|---------------|--------|---------------------------------------------------------|
| channel       | string | orderbooks                                              |
| asks          | array  | Information of sell orders in ascending order of price. |
| bids          | array  | Information of buy orders in descending order of price. |
| symbol        | string | [The handling symbols](https://api.coin.z.com/docs/en/#symbols) |
| timestamp     | string | Timestamp of the orderbook.                             |

### Example Response

```json
{
  "channel": "orderbooks",
  "asks": [
    {"price": "455659", "size": "0.1"},
    {"price": "455658", "size": "0.2"}
  ],
  "bids": [
    {"price": "455665", "size": "0.1"},
    {"price": "455655", "size": "0.3"}
  ],
  "symbol": "BTC",
  "timestamp": "2018-03-30T12:34:56.789Z"
}
```

**Note:** There is no Response when unsubscribe is requested.

## Code Examples

### JavaScript (Node.js)

```javascript
const WebSocket = require("ws");
const ws = new WebSocket("wss://api.coin.z.com/ws/public/v1");

ws.on("open", () => {
    const message = JSON.stringify({
        "command": "subscribe",
        "channel": "orderbooks",
        "symbol": "BTC"
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
ws = websocket.WebSocketApp('wss://api.coin.z.com/ws/public/v1')

def on_open(self):
    message = {
        "command": "subscribe",
        "channel": "orderbooks",
        "symbol": "BTC"
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
    wsUrl := "wss://api.coin.z.com/ws/public/v1"
    origin := "https://api.coin.z.com"
    sendMsg := (`{
        "command": "subscribe",
        "channel": "orderbooks",
        "symbol": "BTC"
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
  ws = Faye::WebSocket::Client.new("wss://api.coin.z.com/ws/public/v1")

  ws.on :open do |event|
    message = {
      :command => "subscribe",
      :channel => "orderbooks",
      :symbol => 'BTC'
    }
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    puts event.data
  end
}
```
