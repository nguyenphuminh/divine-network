## JSON-RPC APIs

This document is a specification for Divine Network's JSON-RPC APIs.

## Request body

Every method will have the same request body like this:

```js
{
    "method": "Method to call",
    "params": {}
}
```

## Respond

```js
{
    "success": true | false,
    "payload": "Respond's payload/main message",
    "error": {
        "Optional, only exists in requests that fail."
    }
}
```

## Methods' params

* `get_algod_conf_info`:
    * Get the algod configuration that we have set up.
    * respond:
        * `token`: The Algod client's token.
        * `url`: The Algod client's endpoint url.
        * `port`: The Algod client's port.

* `get_rollup_info`:
    * Get rollup-related data.
    * respond:
        * `address`: The rollup address.

* `get_sequencer_info`:
    * Get sequencer-related data.
    * respond:
        * `url`: The Algod client's port.
        * `address`: The Algod client's port.
        * `isSequencer`: The Algod client's port.

* `get_algo_privkey`:
    * Get user's Algorand private key.

* `get_algo_address`:
    * Get user's Algorand address.

* `get_eth_privkey`:
    * Get user's Ethereum/Divine private key.

* `get_eth_address`:
    * Get user's Ethereum/Divine address.

* `send_transaction`:
    * Send a transaction to the sequencer, only applies to a sequencer node.
    * params:
        * `tx`: Transaction in form of an object.
    * respond: It will respond with null with success if the transaction is successfully processed.

* `get_balance`:
    * Get balance of an account.
    * params:
        * `address`: Address of account.
    * respond: Balance of the account in string.

* `get_nonce`: 
    * Get nonce of an account.
    * params: 
        * `address`: Address of account.
    * respond: Current nonce of the account in string.

* `get_code`: 
    * Get code of an account.
    * params: 
        * `address`: Address of account.
    * respond: Code of the account in string.

* `get_storageRoot`: 
    * Get storage root of an account.
    * params: 
        * `address`: Address of account.
    * respond: Current storage root of the account in string.

* `get_storage`: 
    * Get full storage map of an account.
    * params: 
        * `address`: Address of account.
    * respond: Current storage map of the account.
