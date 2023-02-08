## Introduction

Built on top of Algorand, Divine Network is a layer 2 rollup network integrated EVM. It inherits all of Algorand's security and decentralization, while still being blazingly fast and scalable.


## What it does

* Divine Network helps Algorand - an already performant and gas-efficient blockchain network to scale up even further, with even higher transaction throughput and cheaper fees. But here's the kicker: Divine Network is built as a rollup - a type of layer 2 scaling solution that has the same capability of a normal blockchain, but fully inherits security from the layer 1. We also have a special technology that makes Divine Network scale even further which can be found in the next part of the documentation.

* Divine Network brings EVM compatibility to Algorand, which helps developers from all EVM-based chains to build on Algorand easily and conveniently utilize their already existing skillset and toolings. Through the integration of the Ethereum Virtual Machine, we believe the dapp ecosystem of Algorand can be pushed much further, with an increasing number in variety of dapps.


## What makes Divine Network special?

* Divine Network is a layer 2 rollup scaling solution on Algorand.

* Diving Network has the Ethereum Virtual Machine (EVM) as its contract execution environment.

* Divine Network is proof-less, requiring no zk proof or optimistic fraud proofs to function.

* Divine Network has fully decentralized sequencers - something that has not been achieved by other rollups in the field currently.

## Deep dive into Divine Network's technology

As mentioned, it is made up of 3 main components: The rollup, the EVM and the proof-less scheme that powers the rollup.

### The rollup

As a layer 2 network, specifically a "rollup", Divine Network moves state data and computation off-chain, while keeping some data on the layer 1 for security. 

To be more specific, transactions sent in a rollup are collected by nodes called "sequencers". Sequencers will then pack some of the transactions into a "batch" (or a "rollup block") and upload the batch onto the layer 1 via a transaction. The special part is that these transactions are not executed or verified on-chain. Nodes will read the transactions from the chain and run them off-chain with their own independent state.

Divine Network's sequencer is fully decentralized, anyone can become a sequencer in the network if they wanted to. There is no stake needed, no governance token needed whatsoever, you can run a sequencer node right from your personal computer, just be sure to have some Algos to pay for gas when submitting rollup batches. This is possible due to our proof-less model mentioned in the next part of the article.

From that, what we have done is to shard the transaction execution process as well as state storage from the layer 1 to a different environment of the layer 2. The aggregation cost is also there, where normally people would have to pay for invidivual transactions on the layer 1, but here, the sequencer pack transactions into a batch and single-handedly submit the batch on-chain. In addition, there are heavy compression tricks of rollups to make transactions even lighter. Batches are also only stored as a note of a transaction in Algorand (or "calldata", depends on how each chain call it), which does not interfere with the layer 1's state storage, which is gas-efficient!

Unlike some existing layer 2 scaling solutions like **plasma chains** or **state channels** such as Lightning Network which are limited to small parties making constrained transactions, a **rollup** like Divine has full capabilities of a normal layer 1 blockchain network. You can create transactions however you like to whoever you like without complicated setups and quirky steps. 

But the biggest advantage of Divine Network is arguably the integration of the Ethereum Virtual Machine, or the "EVM".


### The EVM

Divine Network has the EVM as the core contract execution environment. It is fully compatible with the original EVM that is from Ethereum and in fact is based on an EVM implementation of an existing Ethereum client, which works perfectly well with our rollup model. The transaction format, the address format, signatures, etc are also the same as the original Ethereum.

Using the EVM, Divine Network can:

* Enrich the Algorand's application ecosystem with more dapp potentials as well as ports of existing EVM-based dapps.
* Onboard developers with existing skills and toolings related to EVM-based dapp development.
* Provide an alternative for dapp development to existing languages/tools like PyTEAL or Reach. 


### Proof-less

"Prooflessness" is by far the most unique design of Divine Network compared to other rollups.

In the previous sections, we have seen the mentioning of nodes "running transactions" off-chain. But what if the transactions are faulty? The solution is simple, you just need to skip those transactions and only execute ones that are valid according to the predefined consensus rules. This actually works, the only reason that many rollups like Arbitrum or zksync requires optimistic fraud proof or zk proof is because they are reliant on the layer 1's native token, which introduces the act of bridging the token between the layer 1 and the layer 2. If they submit a faulty bridging transaction, you can not just skip it like you would in Divine's model, cause the layer 1 says otherwise without no proof. If we were to use our own native token for the rollup, then everything's fine, and that's what we do with Divine Network.

The prooflessness model is very powerful in that:

* It is efficient: Divine requires no potential optimistic dispute and no computationally extensive cryptographic proof.
* It solves the upgradability problem: Divine does not need to be upgraded through a centralized multisig or token governance which is controlled by the rich. The community can change their consensus rules to create a hard fork for an upgrade - something that can not be done with traditional rollups.
* It makes decentralized sequencers easy: Since sequencers can submit batches freely and nodes will discard any transaction that are faulty, sequencers don't need to worry about the duplication of some transactions that they might falsely submit from losing a slot to another sequencer. This means that decentralized sequencers with Divine can be done much easier, without clunky stake or bonds like Optimistic rollups.
* It is simple: The model is simple, so it does not carry potential risks to be manipulated by attackers. Meanwhile, Optimistic rollups are systemically complex through its fraud proof scheme, and ZK rollups have encapsulated complexity where cryptography can be easily broken if not done right/tested properly.


## Use cases

There are endless possibilities with a powerful platform like Divine Network. But here are some of the promising use cases:

* Blazing fast transactions and low gas fees, scaling Algorand. 
* Integrating EVM where EVM based dapps can fully function.
* Leveraging the decentralization of Algorand with the decentralized sequencers system.

