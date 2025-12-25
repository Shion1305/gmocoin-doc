# CryptoCurrency Deposit History

Returns CryptoCurrency deposit history data.

## Request

**HTTP Method:** GET

**Endpoint:** `/private/v1/account/deposit/history`

**Authentication:** Required (API-KEY, API-TIMESTAMP, API-SIGN)

## Parameters

**Parameter type:** query

| Parameter     | Type   | Required | Available Values                                                                                                                                                                                      |
|---------------|--------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| symbol        | string | Required | The handling symbols arehere                                                                                                                                                                          |
| fromTimestamp | string | Required | Start search (UTC):YYYY-MM-DDTHH:MM:SS.SSSZ format string (e.g. 2023-03-01T00:00:00.000Z)* When only fromTimestamp is specified, toTimestamp will be 'fromTimestamp + 30 minutes'.                    |
| toTimestamp   | string | Optional | End search (UTC):YYYY-MM-DDTHH:MM:SS.SSSZ format string (e.g. 2023-03-01T00:30:00.000Z)* The maximum difference between fromTimestamp and toTimestamp is 30 minutes.                                 |

## Response

| Property Name | Value  | Description                  |
|---------------|--------|------------------------------|
| address       | string | address                      |
| amount        | string | amount                       |
| fee           | string | fee                          |
| status        | string | status:EXECUTED              |
| symbol        | string | The handling symbols arehere |
| timestamp     | string | executed timestamp(UTC)      |
| txHash        | string | transaction hash             |

## Code Examples

### JavaScript (Node.js)

```javascript
const axios  = require('axios');
const crypto = require('crypto');

const apiKey    = 'YOUR_API_KEY';
const secretKey = 'YOUR_SECRET_KEY';

const timestamp = Date.now().toString();
const method    = 'GET';
const endPoint  = 'https://api.coin.z.com/private';
const path      = '/v1/account/deposit/history';
const parameters = '?symbol=BTC&fromTimestamp=2024-03-01T00:00:00.000Z';

const text = timestamp + method + path;
const sign = crypto.createHmac('sha256', secretKey).update(text).digest('hex');
const options = {
    "headers": {
        "API-KEY": apiKey,
        "API-TIMESTAMP": timestamp,
        "API-SIGN": sign
    }
};

axios.get(endPoint + path + parameters, options)
  .then(function (response) {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Python

```python
import requests
import json
import hmac
import hashlib
import time
from datetime import datetime

apiKey    = 'YOUR_API_KEY'
secretKey = 'YOUR_SECRET_KEY'

timestamp = '{0}000'.format(int(time.mktime(datetime.now().timetuple())))
method    = 'GET'
endPoint  = 'https://api.coin.z.com/private'
path      = '/v1/account/deposit/history'

text = timestamp + method + path
sign = hmac.new(bytes(secretKey.encode('ascii')), bytes(text.encode('ascii')), hashlib.sha256).hexdigest()
parameters = { "symbol": "BTC", "fromTimestamp": "2024-03-01T00:00:00.000Z" }

headers = {
    "API-KEY": apiKey,
    "API-TIMESTAMP": timestamp,
    "API-SIGN": sign
}

res = requests.get(endPoint + path, headers=headers, params=parameters)
print (json.dumps(res.json(), indent=2))
```

### Go

```go
package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "fmt"
    "io"
    "net/http"
    "strconv"
    "time"
    "encoding/json"
    "bytes"
)

func main() {
    apiKey := "YOUR_API_KEY"
    secretKey := "YOUR_SECRET_KEY"
    timestamp := strconv.FormatInt(time.Now().UnixNano()/int64(time.Millisecond), 10)
    method := "GET"
    endPoint := "https://api.coin.z.com/private"
    path := "/v1/account/deposit/history"
    parameters := "?symbol=BTC&fromTimestamp=2024-03-01T00:00:00.000Z"

    text := timestamp + method + path
    hc := hmac.New(sha256.New, []byte(secretKey))
    hc.Write([]byte(text))
    sign := hex.EncodeToString(hc.Sum(nil))

    client := &http.Client{}
    req, _ := http.NewRequest(method, endPoint+path+parameters, nil)
    req.Header.Set("API-KEY", apiKey)
    req.Header.Set("API-TIMESTAMP", timestamp)
    req.Header.Set("API-SIGN", sign)

    res, _ := client.Do(req)
    body, _ := io.ReadAll(res.Body)
    var buf bytes.Buffer
    json.Indent(&buf, body, "", "  ")
    fmt.Println(buf.String())
}
```

### Ruby

```ruby
require 'net/http'
require 'json'
require 'openssl'
require 'base64'
require 'date'

apiKey    = 'YOUR_API_KEY'
secretKey = 'YOUR_SECRET_KEY'

timestamp = DateTime.now.strftime('%Q')
method    = 'GET'
endPoint  = 'https://api.coin.z.com/private'
path      = '/v1/account/deposit/history'
parameters = {
  :symbol => 'BTC',
  :fromTimestamp => '2024-03-01T00:00:00.000Z'
}

text = timestamp + method + path
sign = OpenSSL::HMAC.hexdigest(OpenSSL::Digest::SHA256.new, secretKey, text)

uri = URI.parse(endPoint + path)
uri.query = URI.encode_www_form(parameters)
req = Net::HTTP::Get.new(uri.to_s)

req['API-KEY'] = apiKey
req['API-TIMESTAMP'] = timestamp
req['API-SIGN'] = sign

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
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import kotlin.experimental.and

fun main() {
    var apiKey = "YOUR_API_KEY"
    var secretKey = "YOUR_SECRET_KEY"
    var timestamp = Calendar.getInstance().timeInMillis.toString()
    var method = "GET"
    var endPoint = "https://api.coin.z.com/private"
    var path = "/v1/account/deposit/history"
    var parameters = "?symbol=BTC&fromTimestamp=2024-03-01T00:00:00.000Z"

    var text = timestamp + method + path
    var keySpec = SecretKeySpec(secretKey.toByteArray(), "HmacSHA256")
    var mac = Mac.getInstance("HmacSHA256")
    mac.init(keySpec)
    var sign = mac.doFinal(text.toByteArray()).joinToString("") { String.format("%02x", it and 255.toByte()) }

    var url = URL(endPoint + path + parameters)
    var urlConnection = url.openConnection() as HttpURLConnection
    urlConnection.requestMethod = method
    urlConnection.addRequestProperty("API-KEY", apiKey)
    urlConnection.addRequestProperty("API-TIMESTAMP", timestamp)
    urlConnection.addRequestProperty("API-SIGN", sign)

    BufferedReader(InputStreamReader(urlConnection.inputStream))
        .readLines().forEach { line ->
            println(JSONObject(line).toString(2))
        }
}
```

### PHP

```php
<?php

$apiKey = 'YOUR_API_KEY';
$secretKey = 'YOUR_SECRET_KEY';

$timestamp = time() . '000';
$method = 'GET';
$endPoint = 'https://api.coin.z.com/private';
$path = '/v1/account/deposit/history';
$parameters = '?symbol=BTC&fromTimestamp=2024-03-01T00:00:00.000Z';

$text = $timestamp . $method . $path;
$sign = hash_hmac('SHA256', $text, $secretKey);

$curl = curl_init($endPoint . $path . $parameters);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$headers = array(
    "API-KEY:" . $apiKey,
    "API-TIMESTAMP:" . $timestamp,
    "API-SIGN:" . $sign
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
curl_close($curl);

$json_res = json_decode($response);
echo json_encode($json_res, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
```

### Rust

```rust
#![deny(warnings)]

extern crate reqwest;
extern crate time;
extern crate serde;
extern crate serde_json;
extern crate hex;
extern crate ring;

use std::time::{SystemTime, UNIX_EPOCH};
use hex::encode as hex_encode;
use ring::hmac;

#[warn(unused_must_use)]
fn main() {
    assets().unwrap();
}

fn assets() -> Result<(), Box<dyn std::error::Error>> {
    let api_key = "YOUR_API_KEY";
    let secret_key = "YOUR_SECRET_KEY";
    let timestamp = get_timestamp();
    let method = "GET";
    let endpoint = "https://api.coin.z.com/private";
    let path = "/v1/account/deposit/history";
    let parameters = json!({
        "symbol": "BTC",
        "fromTimestamp": "2024-03-01T00:00:00.000Z"
    });

    let text = format!("{}{}{}", timestamp, method, path);
    let signed_key = hmac::Key::new(hmac::HMAC_SHA256, secret_key.as_bytes());
    let sign = hex_encode(hmac::sign(&signed_key, text.as_bytes()).as_ref());

    let client = reqwest::blocking::Client::new();
    let mut res = client.get(&(endpoint.to_string() + path))
        .header("API-KEY", api_key)
        .header("API-TIMESTAMP", timestamp)
        .header("API-SIGN", sign)
        .query(&parameters)
        .send()
        .unwrap();
    res.copy_to(&mut std::io::stdout())?;

    Ok(())
}

fn get_timestamp() -> u64 {
    let start = SystemTime::now();
    let since_epoch = start.duration_since(UNIX_EPOCH).expect("Time went backwards", );

    since_epoch.as_secs() * 1000 + since_epoch.subsec_nanos() as u64 / 1_000_000
}
```

### Haskell

```haskell
{-# LANGUAGE OverloadedStrings #-}

module Main where

import           Crypto.Hash.SHA256         as SHA256
import           Data.Aeson                 (Value)
import           Data.Aeson.Encode.Pretty
import qualified Data.ByteString            as B
import qualified Data.ByteString.Base16     as B16
import qualified Data.ByteString.Char8      as BS
import qualified Data.ByteString.Lazy.Char8 as S8
import           Data.Monoid                ((<>))
import qualified Data.String                as S
import           Data.Time.Clock.POSIX      (getPOSIXTime)
import           Network.HTTP.Simple

apiKey :: B.ByteString
apiKey = "YOUR_API_KEY"

secretKey :: B.ByteString
secretKey = "YOUR_SECRET_KEY"

method :: B.ByteString
method = "GET"

endPoint :: S.String
endPoint = "https://api.coin.z.com/private"

path :: S.String
path = "/v1/account/deposit/history"

main :: IO ()
main = do
  posixTime <- getPOSIXTime
  let epochTime = BS.pack . show . round $ posixTime
  let timestamp = epochTime <> "000"
  let sign = B16.encode $ SHA256.hmac secretKey (timestamp <> method <> BS.pack path)
  let url = endPoint <> path

  request' <- parseRequest url
  let request
        = setRequestMethod "GET"
        $ setRequestSecure True
        $ setRequestPort 443
        $ setRequestHeader "API-KEY" [apiKey]
        $ setRequestHeader "API-TIMESTAMP" [timestamp]
        $ setRequestHeader "API-SIGN" [sign]
        $ setRequestQueryString [("symbol", Just "BTC"), ("fromTimestamp", Just "2024-03-01T00:00:00.000Z")]
        $ request'
  response <- httpJSON request
  S8.putStrLn $ encodePretty (getResponseBody response :: Value)
```

### C#

```csharp
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

class Example
{
    static readonly HttpClient HttpClient = new HttpClient();

    public static void Main(string[] args)
    {
        var task = Assets();
        task.Wait();
        Console.WriteLine(task.Result);
    }

    static async Task<String> Assets()
    {
        const string apiKey = "YOUR_API_KEY";
        const string secretKey = "YOUR_SECRET_KEY";

        var timestamp = ((long) (DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalSeconds).ToString() + "000";
        const string method = "GET";
        const string endpoint = "https://api.coin.z.com/private";
        const string path = "/v1/account/deposit/history";
        const string parameters = "?symbol=BTC&fromTimestamp=2024-03-01T00:00:00.000Z";

        using (var request = new HttpRequestMessage(new HttpMethod(method), endpoint + path + parameters))
        {
            var text = timestamp + method + path;
            var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));
            var hash = hmacsha256.ComputeHash(Encoding.UTF8.GetBytes(text));
            var sign = ToHexString(hash);

            request.Headers.Add("API-KEY", apiKey);
            request.Headers.Add("API-TIMESTAMP", timestamp);
            request.Headers.Add("API-SIGN", sign);

            var response = await HttpClient.SendAsync(request);
            return await response.Content.ReadAsStringAsync();
        }
    }

    static string ToHexString(byte[] bytes)
    {
        var sb = new StringBuilder(bytes.Length * 2);
        foreach (var b in bytes)
        {
            sb.Append(b.ToString("x2"));
        }

        return sb.ToString();
    }
}
```

### Swift

```swift
import Foundation
import CommonCrypto

extension Data {
    var prettyPrintedJSONString: NSString? {
        guard let object = try? JSONSerialization.jsonObject(with: self, options: []),
              let data = try? JSONSerialization.data(withJSONObject: object, options: [.prettyPrinted]),
              let prettyPrintedString = NSString(data: data, encoding: String.Encoding.utf8.rawValue) else { return nil }
        return prettyPrintedString
    }
}

extension String {
    func hmac(secretKey: String) -> String {
        let text = self.cString(using: String.Encoding.utf8)
        let textLen = Int(self.lengthOfBytes(using: String.Encoding.utf8))
        let digestLen = Int(CC_SHA256_DIGEST_LENGTH)
        let result = UnsafeMutablePointer<CUnsignedChar>.allocate(capacity: digestLen)
        let secretKeyStr = secretKey.cString(using: String.Encoding.utf8)
        let secretKeyLen = Int(secretKey.lengthOfBytes(using: String.Encoding.utf8))

        CCHmac(CCHmacAlgorithm(kCCHmacAlgSHA256), secretKeyStr!, secretKeyLen, text!, textLen, result)
        let digest = stringFromResult(result: result, length: digestLen)
        result.deallocate()
        return digest
    }

    private func stringFromResult(result: UnsafeMutablePointer<CUnsignedChar>, length: Int) -> String {
        let hash = NSMutableString()
        for i in 0..<length {
            hash.appendFormat("%02x", result[i])
        }
        return String(hash)
    }
}

let dispatchGroup = DispatchGroup()
dispatchGroup.enter()

let apiKey = "YOUR_API_KEY"
let secretKey = "YOUR_SECRET_KEY"
let timestamp = String(Int64((Date().timeIntervalSince1970 * 1000.0).rounded()))
let method = "GET"
let endPoint : String = "https://api.coin.z.com/private"
let path : String = "/v1/account/deposit/history"
let parameters = "?symbol=BTC&fromTimestamp=2024-03-01T00:00:00.000Z"

let text = timestamp + method + path
let sign = text.hmac(secretKey: secretKey)

var request = URLRequest(url: URL(string: endPoint + path + parameters)!)
request.httpMethod = method

request.setValue(apiKey, forHTTPHeaderField: "API-KEY")
request.setValue(timestamp, forHTTPHeaderField: "API-TIMESTAMP")
request.setValue(sign, forHTTPHeaderField: "API-SIGN")

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
  "data": [
    {
      "address": "xxx",
      "amount": "0.9503",
      "status": "EXECUTED",
      "symbol": "BTC",
      "timestamp": "2021-10-05T06:04:46.241Z",
      "txHash": "yyy"
    }
  ],
  "responsetime": "2024-02-28T12:20:07.103Z"
}
```
