// Transaction fields

import { Transaction } from "@ethereumjs/tx";

// - to: 20 bytes | Hex string
// - value: 32 bytes | BigInt
// - gas: 8 bytes | BigInt
// - gasPrice: 32 bytes | BigInt
// - r: 32 bytes | Hex string
// - s: 32 bytes | Hex string
// - v: 1 byte | Hex string
// - data: dynamic | Hex string

export function decodeTransaction(tx) {
    try {
        tx = tx.slice(2); // Removes "0x"

        const txObj = {};

        txObj.to = tx.slice(40);
        tx = tx.slice(40);

        txObj.value = BigInt("0x" + tx.slice(64));
        tx = tx.slice(64);

        txObj.gas = BigInt("0x" + tx.slice(16));
        tx = tx.slice(16);

        txObj.gasPrice = BigInt("0x" + tx.slice(64));
        tx = tx.slice(64);

        txObj.sig.r = tx.slice(64);
        tx = tx.slice(64);

        txObj.sig.s = tx.slice(64);
        tx = tx.slice(64);

        txObj.sig.v = tx.slice(2);
        tx = tx.slice(2);

        txObj.data = tx; // Takes what's left

        return txObj;
    } catch(e) {
        throw new Error("Invalid transation format.");
    }
}

export function encodeTransaction(txObj) {
    let calldata = txObj.data.toString(16);

    calldata = calldata.length % 2 !== 0 ? "0" + calldata : calldata;

    const tx = (
        txObj.to                                 + 
        txObj.value.toString(16).padStart(64)    +
        txObj.gas.toString(16).padStart(16)      + 
        txObj.gasPrice.toString(16).padStart(64) +
        txObj.sig.r                              +
        txObj.sig.s                              +
        txObj.sig.v                              +
        calldata
    );

    return "0x" + tx;
}

export async function txObjToEthTxObj(txObj, stateManager) {
    return Transaction.fromTxData({
        to: new Address(Buffer.from(txObj.to, 'hex')),
        value: txObj.value,
        gas: txObj.gas,
        gasPrice: txObj.gasPrice,
        v: BigInt("0x" + txObj.sig.v),
        r: BigInt("0x" + txObj.sig.r),
        s: BigInt("0x" + txObj.sig.s),
        data: "0x" + txObj.data,

        gasLimit: '0x02625a00',

        nonce: stateManager ? stateManager.getAccount(from) : undefined
    });
}

export async function signTx(txObj, senderAddr, senderpk, stateManager) {
    const nonce = (await stateManager.getAccount(senderAddr)).nonce;
    
    const { v, r, s } = Transaction.fromTxData({
        to: new Address(Buffer.from(txObj.to, 'hex')),
        value: txObj.value,
        gas: txObj.gas,
        gasPrice: txObj.gasPrice,
        data: "0x" + txObj.data,

        gasLimit: '0x02625a00',

        nonce
    }).sign(senderpk);

    txObj.sig = { v, r, s };

    return txObj;
}
