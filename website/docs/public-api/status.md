# Service Status

Gets the service status of GMO Coin.

## Request

`GET /public/v1/status`

## Parameters

None

## Response

| Property Name | Value  | Description                           |
|---------------|--------|---------------------------------------|
| status        | string | Service status:MAINTENANCEPREOPENOPEN |

## Code Examples

### JavaScript (Node.js)

```javascript
const axios = require('axios');

const endPoint = 'https://api.coin.z.com/public';
const path     = '/v1/status';

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
path     = '/v1/status'

response = requests.get(endPoint + path)
print(response.json())
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
    path := "/v1/status"

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
path      = '/v1/status'

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
    var path = "/v1/status"
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
$path = '/v1/status';

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
    let body = reqwest::blocking::get("https://api.coin.z.com/public/v1/status")
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
  response <- httpJSON "https://api.coin.z.com/public/v1/status"
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
        var task = Status();
        task.Wait();
        Console.WriteLine(task.Result);
    }

    static async Task<string> Status()
    {
        const string endpoint = "https://api.coin.z.com/public";
        const string path = "/v1/status";
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
let path : String = "/v1/status"

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
    "status": "OPEN"
  },
  "responsetime": "2019-03-19T02:15:06.001Z"
}
```
