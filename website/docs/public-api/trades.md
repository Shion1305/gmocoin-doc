# Trade History

Gets the trade history in descending order of timestamp for a specified symbol.

## Request

`GET /public/v1/trades`

## Parameters

Parameter type: query

| Parameter | Type   | Required | Available Values                                                                                                                                  |
|-----------|--------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| symbol    | string | Required | The handling symbols are [here](#)                                                                                              |
| page      | number | Optional | Target page: If a page is not specified, it will run assuming 1 is set.                                                                         |
| count     | number | Optional | Number of items that you want to get in 1 page: If a count is not specified, it will run assuming 100 (maximum value) is set. |

## Response

| Property Name | Value  | Description        |
|---------------|--------|--------------------|
| price         | string | Executed price     |
| side          | string | Side:BUYSELL       |
| size          | string | Executed quantity  |
| timestamp     | string | Executed timestamp |

## Code Examples

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const endPoint = 'https://api.coin.z.com/public';
const path     = '/v1/trades?symbol=BTC&page=1&count=10';

axios.get(endPoint + path)
  .then(function (response) {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {});
```

### Python

```python
import requests
import json

endPoint = 'https://api.coin.z.com/public'
path     = '/v1/trades?symbol=BTC&page=1&count=10'

response = requests.get(endPoint + path)
print(json.dumps(response.json(), indent=2))
```

### Go

```go
package main

import (
    "fmt"
    "io"
    "net/http"
    "encoding/json"
    "bytes"
)

func main() {
    endPoint := "https://api.coin.z.com/public"
    path := "/v1/trades?symbol=BTC&page=1&count=10"

    response, _ := http.Get(endPoint + path)
    body, _ := io.ReadAll(response.Body)
    var buf bytes.Buffer
    json.Indent(&buf, body, "", "  ")
    fmt.Println(buf.String())
}
```

### Ruby

```ruby
require 'net/http'
require 'uri'
require 'json'

endPoint  = 'https://api.coin.z.com/public'
path      = '/v1/trades?symbol=BTC&page=1&count=10'

uri = URI.parse(endPoint + path)
req = Net::HTTP::Get.new(uri.to_s)

response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') {|http|
  http.request(req)
}
puts JSON.pretty_generate(JSON.parse(response.body), :indent=>'  ')
```

### Kotlin

```kotlin
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

fun main() {
    var endPoint = "https://api.coin.z.com/public"
    var path = "/v1/trades?symbol=BTC&page=1&count=10"
    var method = "GET"

    var url = URL(endPoint + path)
    var urlConnection = url.openConnection() as HttpURLConnection
    urlConnection.requestMethod = method

    BufferedReader(InputStreamReader(urlConnection.inputStream))
        .readLines().forEach { line ->
            println(JSONObject(line).toString(2))
        }
}
```

### PHP

```php
<?php

$endPoint = 'https://api.coin.z.com/public';
$path = '/v1/trades?symbol=BTC&page=1&count=10';

$curl = curl_init($endPoint . $path);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);

$json_res = json_decode($response);
echo json_encode($json_res, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
```

### Rust

```rust
extern crate reqwest;
fn main() {
    let body = reqwest::blocking::get("https://api.coin.z.com/public/v1/trades?symbol=BTC&page=1&count=10")
        .expect("Failed")
        .text();
    println!("body = {:?}", body);
}
```

### Haskell

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Main where

import           Data.Aeson                 (Value)
import           Data.Aeson.Encode.Pretty
import qualified Data.ByteString.Lazy.Char8 as S8
import           Network.HTTP.Simple

main :: IO ()
main = do
  request' <- parseRequest "https://api.coin.z.com/public/v1/trades"
  let request
        = setRequestMethod "GET"
        $ setRequestSecure True
        $ setRequestPort 443
        $ setRequestQueryString [("symbol", Just "BTC"), ("page", Just "1"), ("count", Just "10")]
        $ request'
  response <- httpJSON request
  S8.putStrLn $ encodePretty (getResponseBody response :: Value)
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Example
{
    static readonly HttpClient HttpClient = new HttpClient();

    public static void Main(string[] args)
    {
        var task = Trades();
        task.Wait();
        Console.WriteLine(task.Result);
    }

    static async Task<string> Trades()
    {
        const string endpoint = "https://api.coin.z.com/public";
        const string path = "/v1/trades?symbol=BTC&page=1&count=10";
        return await HttpClient.GetStringAsync(endpoint + path);
    }
}
```

### Swift

```swift
import Foundation

extension Data {
    var prettyPrintedJSONString: NSString? {
        guard let object = try? JSONSerialization.jsonObject(with: self, options: []),
              let data = try? JSONSerialization.data(withJSONObject: object, options: [.prettyPrinted]),
              let prettyPrintedString = NSString(data: data, encoding: String.Encoding.utf8.rawValue) else { return nil }
        return prettyPrintedString
    }
}

let dispatchGroup = DispatchGroup()
dispatchGroup.enter()

let endPoint : String = "https://api.coin.z.com/public"
let path : String = "/v1/trades?symbol=BTC&page=1&count=10"

var request = URLRequest(url: URL(string: endPoint + path)!)
request.httpMethod = "GET"

let task = URLSession.shared.dataTask(with: request, completionHandler: { data, response, error in
    print(data!.prettyPrintedJSONString!)
    dispatchGroup.leave()
})
task.resume()

dispatchGroup.notify(queue: .main) {
    exit(EXIT_SUCCESS)
}
dispatchMain()
```

## Response Example

```json
{
  "status": 0,
  "data": {
    "pagination": {
      "currentPage": 1,
      "count": 30
    },
    "list": [
      {
        "price": "750760",
        "side": "BUY",
        "size": "0.1",
        "timestamp": "2018-03-30T12:34:56.789Z"
      }
    ]
  },
  "responsetime": "2019-03-28T09:28:07.980Z"
}
```
