# Access Token Authentication

Private WebSocket API requires authentication using access tokens. This document describes how to create, extend, and delete access tokens.

## Overview

- Using a [Private API](https://api.coin.z.com/docs/en/?rust#ws-auth-post) for authentication in order to obtain, extend and remove the access token
- A Private WebSocket API's URL will be: `Endpoint of Private WebSocket API + Access token`
  - Example: `wss://api.coin.z.com/ws/private/v1/xxxxxxxxxxxxxxxxxxxx`
- A ping will be sent from the server to a client once per minute
- If there's no response (pong) from a client 3 consecutive times, the WebSocket will be disconnected automatically

## Access Token Details

- The expiration time of access token is 60 minutes
- The maximum number of access tokens is 5
- If the number of issued tokens exceeds the maximum number of tokens, the tokens will be deleted in order of expiration time
- To use the API with the existing API keys, open your membership site > API > 編集 (Edit) > APIキーの編集 (API key setting) screen and click:
  - "約定情報通知(WebSocket)" (Execution Notifications)
  - "注文情報通知(WebSocket)" (Order Notifications)
  - "ポジション情報通知(WebSocket)" (Position Notifications)
  - "ポジションサマリー情報通知(WebSocket)" (Position Summary Notifications)

**Important:** Please set the API key permission before obtaining the access token.

---

## Create Access Token

Gets an access token to call Private WebSocket API.

### Request

**Endpoint:** `POST /private/v1/ws-auth`

### Parameters

None

### Response

| Property Name | Value  | Description  |
|---------------|--------|--------------|
| data          | string | Access token |

### Example Response

```json
{
  "status": 0,
  "data": "xxxxxxxxxxxxxxxxxxxx",
  "responsetime": "2019-03-19T02:15:06.102Z"
}
```

### Code Examples

#### JavaScript (Node.js)

```javascript
const axios  = require('axios');
const crypto = require('crypto');

const apiKey    = 'YOUR_API_KEY';
const secretKey = 'YOUR_SECRET_KEY';

const timestamp = Date.now().toString();
const method    = 'POST';
const endPoint  = 'https://api.coin.z.com/private';
const path      = '/v1/ws-auth';
const reqBody   = JSON.stringify({})

const text = timestamp + method + path + reqBody;
const sign = crypto.createHmac('sha256', secretKey).update(text).digest('hex');
const options = {
    "headers": {
        "API-KEY": apiKey,
        "API-TIMESTAMP": timestamp,
        "API-SIGN": sign
    }
};

axios.post(endPoint + path, reqBody, options)
  .then(function (response) {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### Python

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
method    = 'POST'
endPoint  = 'https://api.coin.z.com/private'
path      = '/v1/ws-auth'
reqBody = {}

text = timestamp + method + path + json.dumps(reqBody)
sign = hmac.new(bytes(secretKey.encode('ascii')), bytes(text.encode('ascii')), hashlib.sha256).hexdigest()

headers = {
    "API-KEY": apiKey,
    "API-TIMESTAMP": timestamp,
    "API-SIGN": sign
}

res = requests.post(endPoint + path, headers=headers, data=json.dumps(reqBody))
print (json.dumps(res.json(), indent=2))
```

---

## Extend Access Token

Extends the expiration time of an existing access token.

### Request

**Endpoint:** `PUT /private/v1/ws-auth`

### Parameters

Parameter type: JSON

| Parameter | Type   | Required | Available Values |
|-----------|--------|----------|------------------|
| token     | string | Required | Access token     |

### Example Response

```json
{
  "status": 0,
  "responsetime": "2019-03-19T02:15:06.102Z"
}
```

### Code Examples

#### JavaScript (Node.js)

```javascript
const axios  = require('axios');
const crypto = require('crypto');

const apiKey    = 'YOUR_API_KEY';
const secretKey = 'YOUR_SECRET_KEY';

const timestamp = Date.now().toString();
const method    = 'PUT';
const endPoint  = 'https://api.coin.z.com/private';
const path      = '/v1/ws-auth';
const reqBody   = JSON.stringify({
    "token": "xxxxxxxxxxxxxxxxxxxx"
})

const text = timestamp + method + path;
const sign = crypto.createHmac('sha256', secretKey).update(text).digest('hex');
const options = {
    "headers": {
        "API-KEY": apiKey,
        "API-TIMESTAMP": timestamp,
        "API-SIGN": sign
    }
};

axios.put(endPoint + path, reqBody, options)
  .then(function (response) {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### Python

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
method    = 'PUT'
endPoint  = 'https://api.coin.z.com/private'
path      = '/v1/ws-auth'
reqBody = {
    "token": "xxxxxxxxxxxxxxxxxxxx"
}

text = timestamp + method + path
sign = hmac.new(bytes(secretKey.encode('ascii')), bytes(text.encode('ascii')), hashlib.sha256).hexdigest()

headers = {
    "API-KEY": apiKey,
    "API-TIMESTAMP": timestamp,
    "API-SIGN": sign
}

res = requests.put(endPoint + path, headers=headers, data=json.dumps(reqBody))
print (json.dumps(res.json(), indent=2))
```

---

## Delete Access Token

Deletes an access token.

### Request

**Endpoint:** `DELETE /private/v1/ws-auth`

### Parameters

Parameter type: JSON

| Parameter | Type   | Required | Available Values |
|-----------|--------|----------|------------------|
| token     | string | Required | Access token     |

### Example Response

```json
{
  "status": 0,
  "responsetime": "2019-03-19T02:15:06.102Z"
}
```

### Code Examples

#### JavaScript (Node.js)

```javascript
const axios  = require('axios');
const crypto = require('crypto');

const apiKey    = 'YOUR_API_KEY';
const secretKey = 'YOUR_SECRET_KEY';

const timestamp = Date.now().toString();
const method    = 'DELETE';
const endPoint  = 'https://api.coin.z.com/private';
const path      = '/v1/ws-auth';
const reqBody   = JSON.stringify({
    "token": "xxxxxxxxxxxxxxxxxxxx"
})

const text = timestamp + method + path;
const sign = crypto.createHmac('sha256', secretKey).update(text).digest('hex');
const options = {
    "headers": {
        "API-KEY": apiKey,
        "API-TIMESTAMP": timestamp,
        "API-SIGN": sign
    },
    "data": reqBody,
};

axios.delete(endPoint + path, options)
  .then(function (response) {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.log(error);
  });
```

#### Python

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
method    = 'DELETE'
endPoint  = 'https://api.coin.z.com/private'
path      = '/v1/ws-auth'
reqBody = {
    "token": "xxxxxxxxxxxxxxxxxxxx"
}

text = timestamp + method + path
sign = hmac.new(bytes(secretKey.encode('ascii')), bytes(text.encode('ascii')), hashlib.sha256).hexdigest()

headers = {
    "API-KEY": apiKey,
    "API-TIMESTAMP": timestamp,
    "API-SIGN": sign
}

res = requests.delete(endPoint + path, headers=headers, data=json.dumps(reqBody))
print (json.dumps(res.json(), indent=2))
```
