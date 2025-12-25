# Ticker

Gets the latest rates of the specified symbol. After subscribing, tickers start to be sent.

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
| channel       | string | Required | ticker              |
| symbol        | string | Required | [The handling symbols](https://api.coin.z.com/docs/en/#symbols) |

### Example

```json
{
  "command": "subscribe",
  "channel": "ticker",
  "symbol": "BTC"
}
```

## Response Format

### Fields

| Property Name | Value  | Description                                              |
|---------------|--------|----------------------------------------------------------|
| channel       | string | ticker                                                   |
| ask           | string | The best indicative price in the current selling orders. |
| bid           | string | The best indicative price in the current buying orders.  |
| high          | string | The highest trading price of the day.                    |
| last          | string | The latest trading price.                                |
| low           | string | The lowest trading price of the day.                     |
| symbol        | string | [The handling symbols](https://api.coin.z.com/docs/en/#symbols) |
| timestamp     | string | Executed timestamp.                                      |
| volume        | string | Volume of trade in 24 hours.                             |

### Example Response

```json
{
  "channel": "ticker",
  "ask": "750760",
  "bid": "750600",
  "high": "762302",
  "last": "756662",
  "low": "704874",
  "symbol": "BTC",
  "timestamp": "2018-03-30T12:34:56.789Z",
  "volume": "194785.8484"
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
        "channel": "ticker",
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
        "channel": "ticker",
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
        "channel": "ticker",
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
      :channel => "ticker",
      :symbol => 'BTC'
    }
    ws.send(message.to_json)
  end

  ws.on :message do |event|
    puts event.data
  end
}
```
