# Creating API Keys

To use the GMO Coin Private API, you need to create an API key from your account.

## Prerequisites

### Opening a New Account

If you don't have an account yet, you can [sign up for free](https://coin.z.com/jp/member/signup).

## Creating Your API Key

1. Log in to your GMO Coin account
2. Navigate to the membership site
3. Go to API settings
4. Create a new API key

### API Key Permissions

When creating an API key, you can set permissions for each functionality:

- **Read-only**: View account information, orders, and positions
- **Trading**: Place, modify, and cancel orders
- **Withdrawals**: Initiate cryptocurrency withdrawals
- **Transfers**: Transfer funds between accounts

**Security Best Practice**: Only grant the minimum permissions required for your use case.

## IP Restrictions

For enhanced security, you can enable IP restrictions:

- Specify allowed IP addresses in the membership site
- API calls from non-registered IPs will be denied
- Recommended for production environments

## API Key Components

Your API key consists of two parts:

1. **API Key**: Public identifier (can be shared in request headers)
2. **Secret Key**: Private secret (never share or expose this)

### Storing Your Credentials

```bash
# Example: Store in environment variables (recommended)
export GMO_API_KEY="your_api_key_here"
export GMO_SECRET_KEY="your_secret_key_here"
```

**⚠️ Security Warning**:
- Never commit API keys to version control
- Never share your secret key
- Rotate keys regularly
- Use environment variables or secure vaults to store credentials

## Next Steps

- [Learn about Authentication](./authentication.md) - How to use your API keys
- [Understand Rate Limiting](./rate-limiting.md) - API usage limits based on trading volume
