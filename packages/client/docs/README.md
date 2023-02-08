## Run the client

### Prerequisite

Be sure to have these dependencies installed:

* NodeJS v16 or higher.
* Latest release of npm.

### Installation

Simply clone the repository, you can do this by either downloading it straight from this page, or do it on your own terminal with `git`:

```
git clone https://github.com/divine-network/divine-network.git
```

### Setting up the client

First, install the needed packages through `npm`:

```
npm install
```

Then configure your client in `./config.js`:

```js
export default {
    // Algorand account info
    MNEMONIC: "Mnemonic of your Algorand account",
    
    // Divine account info
    PRIVKEY: "Private key used for Divine (equivalent to what Ethereum has)",
    
    // Sequencer config
    SEQUENCER_URL: "Sequencer url, can leave blank",
    SEQUENCER_ADDRESS: "Sequencer address, can leave blank",
    SEQUENCER_MODE: /* Leave false to run a normal node, true for sequencer node */,

    // Rollup config
    ROLLUP_ADDRESS: "V5PYFX5ZWT6FGDGD4X7BPVWRHG2NCLS2HS2MQRKR6IGQIIJLAI5UVR4GJI",
                    /* Static rollup address */
    
    // Sync config
    START_SYNC: 27546300 /* Algorand round number to start syncing from */,
    
    // Algod client config
    TOKEN: "Algod token",
    ALGODURL: "Algod client url",
    PORT: 443 /* Port of the client */,

    // RPC server config
    RPC_PORT: 3000 /* Port of the local RPC server */,

    // DB Path
    LEVEL_PATH: "Path/to/db/folder" /* This is the place where every account data is stored */,
    LOG_PATH: "Path/to/log/file" /* This is the place where the current block synced is stored */

}

```

### Run!

Simply type:

```
node .
```

To start up the client.


## Interact with the client

Currently, the only way to properly interact with the client is to use the pre-built JSON-RPC APIs. [Here it is specs doc](./JSON-RPC.md). 
