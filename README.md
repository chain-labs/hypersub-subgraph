## Hypersub Subgraph

Currently the subgraph is indexing [STP V1](https://hypersub.withfabric.xyz/), specifically only indexing the subscribers and their active state.

This project was taken on as during one of the project, we had to integrate Hypersub and track the subscriptions from a Python DJango project. We couldn't use the available SDK provided by hypersub as it is written in Typescript.

We plan to maintain it and upgrade based on community feedback and response. The project is not fully tested, so be careful while using it.

Thanks

Resources:
- WithFabric Contracts: https://github.com/withfabricxyz/contracts/
- SDK: https://github.com/withfabricxyz/protocol-sdks

Please support this project by signaling the Published Subgraph here.

The Subgraph can be found here: https://thegraph.com/explorer/subgraphs/2DfPMyXx2EJ6zccT85wG8BWvEPzWYEe89HHtjMqNdXrh?v=0&view=Curators&chain=arbitrum-one

## Build
```
graph codegen && graph build
```

## Deploy
```
graph deploy --studio hypersub-v1-on-base
```
