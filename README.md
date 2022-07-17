# gmcafe.io
Official Good Morning Café website. Powered by React + Next.js, TypeScript, and Tailwindcss.

https://gmcafe.io

## :ship: Deployments
Handled by Vercel. Every commit & branch generates a unique URL using the commit hash and/or branch name as the subdomain. 

Visit https://vercel.com/gmcafe for more details.

## :computer: Development
#### `npm ci`
Runs a clean install of all the dependencies needed to run the repository locally.

#### `npm run dev`
Starts a local development server of the website.

If you want the site to be accessible by all devices on your local network, append `-- -H <ip_address>` to the command. Use `ipconfig` or `ifconfig` to find what your local IP address is.

#### `.env.local`
```
INFURA_KEY= <infura key for ethereum network requests>

# Note: not required but eventually used for the royalty card page
CLIENT_ID= <discord bot client id>
CLIENT_SECRET= <discord bot client secret>
REDIRECT_URL= <discord oauth2 redirect url>

# Note: will be deprecated once /checkin is removed
AIRTABLE_KEY= <airtable key>

SENTRY_DSN= <sentry dsn>
```
