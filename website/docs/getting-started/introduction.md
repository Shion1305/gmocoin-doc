# Introduction

GMO Coin provides a Public API that does not require authentication and a Private API that requires authentication using an API key.

## Key Features

- **Secure Communication**: All requests from the client to the API use [HTTPS](https://en.wikipedia.org/wiki/HTTPS) communication
- **Trading Support**: Only Spot and Margin trading are supported
- **Multiple Languages**: Code examples provided in 10+ programming languages

## API Types

### Public API
- No authentication required
- Access to market data, ticker information, order books, and trade history
- Free to use for all users

### Private API
- Requires authentication with API key and secret
- Access to account information, trading, and order management
- Rate limits based on trading volume

## Supported Languages

Code examples are available in the following languages:

- **Node.js** (v21.0.0+)
- **Python** (3.12.0+)
- **Go** (1.21.3+)
- **Ruby** (3.2.2+)
- **PHP** (8.2.11+)
- **Kotlin** (1.9.10+)
- **C#** (.NET Framework 8.0.1+)
- **Rust** (rustc 1.73.0+)
- **Haskell** (ghc 9.8.1+)
- **Swift** (5.8.1+)

## Next Steps

1. [Create an API Key](./api-keys.md) - Learn how to set up API access
2. [Understand Endpoints](./endpoints.md) - Learn about available API endpoints
3. [Authentication Guide](./authentication.md) - Learn how to authenticate your requests
4. [Rate Limiting](./rate-limiting.md) - Understand API usage limits
