// Bad RPC server implementation, will be updated soon.

"use strict";

import Fastify from "fastify";
import { RLP } from "@ethereumjs/rlp";

import config from "../../config.js";

const { 
    MNEMONIC, 
    SEQUENCER_URL, 
    SEQUENCER_ADDRESS, 
    SEQUENCER_MODE,
    ROLLUP_ADDRESS, 
    START_SYNC, 
    TOKEN, 
    ALGODURL, 
    PORT,
} = config;

const fastify = Fastify();

export function rpc(PORT, client, ethClient, algoClient) {

    process.on("uncaughtException", err => console.log("LOG ::", err));

    fastify.post("/", async (req, reply) => {
        function throwError(message, status, payload = null) {
            reply.status(status);

            reply.send({
                success: false,
                payload: null,
                error: { message }
            });
        }

        function respond(payload) {
            reply.send({
                success: true,
                payload
            })
        }

        if (typeof req.body.params !== "object") {
            throwError("Invalid method.", 404);

            return;
        }

        switch (req.body.params.method) {

            case "get_storage": 

                try {
                    const stateRoot = (await ethClient.vm.stateManager.getAccount(req.body.params.address)).stateRoot.toString("hex");
                    const storageTrie = ethClient.vm.trie.copy();

                    storageTrie.root(stateRoot);

                    const stream = storageTrie.createReadStream();

                    const storageCache = {};

                    stream
                        .on('data', (data) => {
                            storageCache[data.key.toString("hex")] = RLP.decode(data.value).toString("hex");
                        })
                        .on('end', () => respond(storageCache));
                } catch (e) {
                    throwError("Unexpected error.", 404);
                }

                break;

            case "get_storageRoot":

                try {
                    respond( (await ethClient.vm.stateManager.getAccount(req.body.params.address)).stateRoot.toString("hex") );
                } catch (e) {
                    throwError("Unexpected error.", 404);
                }

                break;

            case "get_nonce":

                try {
                    respond( (await ethClient.vm.stateManager.getAccount(req.body.params.address)).nonce.toString() );
                } catch (e) {
                    throwError("Unexpected error.", 404);
                }

                break;

            case "get_code":

                try {
                    respond( (await ethClient.vm.stateManager.getAccount(req.body.params.address)).code.toString("hex") );
                } catch (e) {
                    throwError("Unexpected error.", 404);
                }

                break;

            case "get_balance":

                try {
                    respond( (await ethClient.vm.stateManager.getAccount(req.body.params.address)).balance.toString() );
                } catch (e) {
                    throwError("Unexpected error.", 404);
                }

                break;

            case "send_transaction": // This is sequencer-specific
                client.transactionPool.push(req.body.params.tx);

                respond(null);

                break;
            
            case "get_eth_address":

                respond(ethClient.address);

                break;
            
            case "get_eth_privkey":

                respond(ethClient.privkey);
                
                break;
                
            case "get_algo_address":

                respond(algoClient.address);
                
                break;
            
            case "get_algo_privkey":

                respond(algoClient.privkey);

                break;
            
            case "get_sequencer_info":

                respond({
                    url: SEQUENCER_URL,
                    address: SEQUENCER_ADDRESS,
                    isSequencer: SEQUENCER_MODE
                });

                break;
            
            case "get_rollup_info":

                respond({
                    address: ROLLUP_ADDRESS
                });

                break;
            
            case "get_algod_conf_info":
                
                respond({
                    token:TOKEN,
                    url: ALGODURL,
                    port: PORT
                })

                break;

            default:
                throwError("Invalid method.", 404);
        }
    });

    fastify.listen(PORT, (err, address) => {
        if (err) {
            console.log("LOG :: Error at RPC server: Fastify: ", err);
            process.exit(1);
        }

        console.log(`LOG :: RPC server running on PORT ${PORT}`);
    });
}
