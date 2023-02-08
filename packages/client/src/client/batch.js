import { decodeTransaction, encodeTransaction } from "./txn.js";
import algosdk from "algosdk";


export function decodeBatch(batch) {
    batch = JSON.parse(`[${batch}]`);

    const newBatch = [];

    for (const txn of batch) {
        newBatch.push(decodeTransaction("0x" + txn));
    }
}

export function encodeBatch(batch) {
    let txList = [];

    for (const tx of batch) {
        txList.push(encodeTransaction(tx).slice(2));
    }

    return JSON.stringify(txList).slice(1,-1); // Remove "[" and "]";
}

export async function uploadBatch(batch, client, sequencerAccount) {
    // Construct the transaction
    let params = await client.getTransactionParams().do();

    const receiver = "V5PYFX5ZWT6FGDGD4X7BPVWRHG2NCLS2HS2MQRKR6IGQIIJLAI5UVR4GJI";
    const note = new Uint8Array(Buffer.from(batch.slice(2), "hex"));
    let amount = 0; // equals 1 ALGO
    let sender = sequencerAccount.addr;

    let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: sender, 
        to: receiver, 
        amount: amount, 
        note: note, 
        suggestedParams: params
    });

    // Sign the transaction
    let signedTxn = txn.signTxn(sequencerAccount.sk);
    let txId = txn.txID().toString();

    // Submit the transaction
    await client.sendRawTransaction(signedTxn).do();

    // Wait for confirmation
    /*let confirmedTxn =*/ await algosdk.waitForConfirmation(client, txId, 4);
}
