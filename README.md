# vuejs-jwt
Lightweight JWT handler for Vue.js 2.

## Getting Started


Install using npm:

```bash
$ npm install vuejs-jwt --save
```

Import and register Vue plugin:

```js
import Vue from 'vue'
import VueJWT from 'vuejs-jwt'

Vue.use(VueJWT, options)
```

Available options are described below.

## Usage

In your Vue.js components, simply call one of these methods:

```js
// Return true / false - check if a JWT token is stored in cookies or local storage
this.$jwt.hasToken()

// Return token from cookies or local storage
this.$jwt.getToken()

// Decode JWT token and return payload
this.$jwt.decode()
```

You can also specify a custom token and sign key:
 
 ```js
this.$jwt.decode(customToken, secretKey)
```

$jwt object is also available outside of components using Vue object:

```js
import Vue from 'vue'

const payload = Vue.$jwt.decode()
```

## Available options

**signKey** (required) : Token signature key

storage (default: localStorage) : cookie | localStorage

keyName (default: auth_token) : name of the key used to fetch token from cookie or local storage

ignoreExpiration (default: false) : set true to ignore expiration date

ignoreNotBefore (default: false) : set true to ignore 'not before' date

audience (default: null) : you can specify a string if you want to validate token audience property

issuer (default: null) : you can specify a string if you want to validate token issuer

subject (default: null) : you can specify a string if you want to validate token subject
