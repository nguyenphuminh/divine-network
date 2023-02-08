import { txObjToEthTxObj } from "./txn.js";

export async function transitState(batch, vm, algodClient) {
    for (const txn of batch) {
        const ethTxn = txObjToEthTxObj(txn);

        try {
            await vm.stateManager.checkpoint();
            await vm.runTx({ tx: ethTxn });
            await vm.stateManager.commit();
            await vm.stateManager.flush();
        } catch (e) {}
    }
}
