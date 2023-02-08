import fs from "fs";
import algosdk from "algosdk";

import { Chain, Common, Hardfork } from "@ethereumjs/common";
import { Transaction } from "@ethereumjs/tx";
import { VM } from "@ethereumjs/vm";
import { Block } from "@ethereumjs/block";
import { Account, Address } from '@ethereumjs/util'
import { DefaultStateManager } from '@ethereumjs/statemanager'
import { Trie } from "@ethereumjs/trie";
import { Level } from "level";
import { LevelDB } from "../lib/level.js";

import config from "../../config.js";
import { decodeBatch, encodeBatch, uploadBatch } from "./batch.js";
import { transitState } from "./state.js";
import { rpc } from "../rpc/rpc.js";

const { 
    MNEMONIC, 
    PRIVKEY,
    SEQUENCER_URL, 
    SEQUENCER_ADDRESS, 
    SEQUENCER_MODE,
    ROLLUP_ADDRESS, 
    START_SYNC, 
    TOKEN, 
    ALGODURL, 
    PORT,
    RPC_PORT,
    LEVEL_PATH,
    LOG_FILE
} = config;

const token = TOKEN;
const server = ALGODURL;
const port = PORT;
const client = new algosdk.Algodv2(token, server, port);

const myAccount = algosdk.mnemonicToSecretKey(MNEMONIC);

const common = new Common({ chain: Chain.Mainnet, hardfork: Hardfork.Berlin });

const trie = new Trie({
    db: new LevelDB(new Level(LEVEL_PATH)),
    useKeyHashing: true,
});

const stateManager = new DefaultStateManager({ trie });

const vm = await VM.create({ common, stateManager });

/*
(async () => {
    const roundNumber = 18038133;
    const block = await client.block(roundNumber).do();

    console.log(algosdk.encodeAddress(block.block.txns[2].txn.rcv));
})();
*/


// Sync

let counter;

if (!fs.existsSync(LOG_FILE)) {
    counter = START_SYNC;
} else {
    counter = parseInt(fs.readFileSync(LOG_FILE));
}

setTimeout(async function sync() {
    try {
        for (;;) {
            let block = await client.block(counter).do();

            for (const txnObj of block.block.txns) {
                const { txn } = txnObj;

                if (txn.rcv === ROLLUP_ADDRESS) {
                    const batch = decodeBatch(dec.decode(txn.note));

                    // Start doing stuff with batch
                    await transitState(batch, vm, client);
                }
            }

            fs.writeFileSync(LOG_FILE, counter.toString());

            counter++;
        }

    } catch (e) {
        setTimeout(sync, 4500);
    }
});


const transactionPool = [];


// RPC server

rpc(RPC_PORT, {
    transactionPool
}, {
    address: Address.fromPrivateKey(Buffer.from(PRIVKEY.slice(2), "hex")),
    privkey: PRIVKEY,
    vm
}, {
    address: myAccount.addr,
    privkey: myAccount.sk 
});


// Sequencers

if (SEQUENCER_MODE) {
    // Do sequencer stuff

    setTimeout(async () => {
        const batch = encodeBatch([...transactionPool.splice(0, 500)]);

        uploadBatch(batch, client, myAccount);
    });
}
