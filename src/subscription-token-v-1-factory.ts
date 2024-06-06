import { Address, BigInt, Bytes, ethereum, log, store } from "@graphprotocol/graph-ts"
import {
  DeployFeeChange as DeployFeeChangeEvent,
  DeployFeeTransfer as DeployFeeTransferEvent,
  Deployment as DeploymentEvent,
  FeeCreated as FeeCreatedEvent,
  FeeDestroyed as FeeDestroyedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/SubscriptionTokenV1Factory/SubscriptionTokenV1Factory"
import {
  SubscriptionTokenV1Factory as SubscriptionTokenV1FactoryEntity,
  FeeConfig as FeeConfigEntity,
  SubscriptionTokenV1 as SubscriptionTokenV1Entity
} from "../generated/schema"
import {
  SubscriptionTokenV1 as SubscriptionTokenV1Contract
} from "../generated/SubscriptionTokenV1/SubscriptionTokenV1";
import {
  SubscriptionTokenV1 as SubscriptionTokenV1Template
} from "../generated/templates";

export const MAX_REWARD_HALVINGS = BigInt.fromI32(32);
export const MAX_FEE_BIPS = BigInt.fromI32(1250);
export const MAX_BIPS = BigInt.fromI32(10000);

export function generateFactoryId(factoryAddress: Address): string {
  return factoryAddress.toHexString();
}

export function generateFeeConfigId(feeId: BigInt): string {
  return feeId.toHexString();
}

export function generateHypersubEntityId(hypersubAddress: Address): string {
  return hypersubAddress.toHexString();
}

export function handleDeployFeeChange(event: DeployFeeChangeEvent): void {
  const newFee = event.params.amount;
  const factoryId = generateFactoryId(event.address);
  let factoryEntity = SubscriptionTokenV1FactoryEntity.load(factoryId);
  if(factoryEntity == null) {
    log.error("SubscriptionTokenV1Factory Entity with ID {}, not created properly.", [factoryId]);
    return;
  }
  factoryEntity.deployFee = newFee;
  factoryEntity.save();
}

export function handleDeployFeeTransfer(event: DeployFeeTransferEvent): void {
  const withdrawnAmount = event.params.amount;
  const factoryId = generateFactoryId(event.address);
  let factoryEntity = SubscriptionTokenV1FactoryEntity.load(factoryId);
  if(factoryEntity == null) {
    log.error("SubscriptionTokenV1Factory Entity with ID {}, not created properly.", [factoryId]);
    return;
  }
  factoryEntity.totalFeesWithdrawn = factoryEntity.totalFeesWithdrawn.plus(withdrawnAmount);
  factoryEntity.save();
}

export function handleDeployment(event: DeploymentEvent): void {
  const deployedSubscriptionAddress = event.params.deployment;
  const factoryId = generateFactoryId(event.address);
  let factoryEntity = SubscriptionTokenV1FactoryEntity.load(factoryId);
  if(factoryEntity == null) {
    log.error("SubscriptionTokenV1Factory Entity with ID {}, not created properly.", [factoryId]);
    return;
  }

  // create hypersub instance
  const hypersubInstance = SubscriptionTokenV1Contract.bind(event.params.deployment);
  const inputDataHexString = '0x0000000000000000000000000000000000000000000000000000000000000020' + event.transaction.input.toHexString().slice(10);
  const bytesArrayInputData = Bytes.fromByteArray(Bytes.fromHexString(inputDataHexString));
  const decoded = ethereum.decode('(string,string,string,string,uint256,uint256,uint16,address,uint256)', bytesArrayInputData);
  if(decoded == null) {
    log.error("Decoded incorrectly, {}", [bytesArrayInputData.toHexString()]);
    return;
  }
  const decodedTuple = decoded.toTuple();
  if(decodedTuple == null) {
    log.error("Decoded incorrectly, {}", [bytesArrayInputData.toHexString()]);
    return;
  }
  const name = decodedTuple[0].toString();
  const symbol = decodedTuple[1].toString();
  const contractUri = decodedTuple[2].toString();
  const tokenUri = decodedTuple[3].toString();
  const decodedtokensPerSecond= decodedTuple[4].toBigInt();
  const decodedminimumPurchaseSeconds= decodedTuple[5].toBigInt();
  const decodederc20TokenAddr= decodedTuple[7].toAddress();

  // create hypersub entity
  const hypersubEntityId = generateHypersubEntityId(event.params.deployment);
  // this is the first time the hyper sub is created
  let hypersubEntity = new SubscriptionTokenV1Entity(hypersubEntityId);
  hypersubEntity.address = deployedSubscriptionAddress;
  hypersubEntity.MAX_BIPS = MAX_BIPS;
  hypersubEntity.MAX_REWARD_HALVINGS = MAX_REWARD_HALVINGS;
  hypersubEntity.MAX_FEE_BIPS = MAX_FEE_BIPS;
  hypersubEntity.owner = hypersubInstance.owner();
  hypersubEntity.pendingOwner = null;
  hypersubEntity.tokensPerSecond = decodedtokensPerSecond;
  hypersubEntity.minPurchaseSeconds = decodedminimumPurchaseSeconds;
  hypersubEntity.minimumPurchase = decodedminimumPurchaseSeconds.times(decodedtokensPerSecond);
  hypersubEntity.token = decodederc20TokenAddr;
  hypersubEntity.isErc20 = decodederc20TokenAddr != Address.zero();
  hypersubEntity.deployBlockTime = event.block.timestamp;
  hypersubEntity.deployBlockNumber = event.block.number;
  hypersubEntity.deployTrxHash = event.transaction.hash;
  hypersubEntity.totalWithdrawn = BigInt.zero();
  hypersubEntity.factory = factoryId;
  hypersubEntity.isPaused = false;
  hypersubEntity.name = name;
  hypersubEntity.symbol = symbol;
  hypersubEntity.contractURI = contractUri;
  hypersubEntity.tokenURI = tokenUri;
  hypersubEntity.save();

  // instantiate the template
  SubscriptionTokenV1Template.create(deployedSubscriptionAddress);
}

export function handleFeeCreated(event: FeeCreatedEvent): void {
  const feeReceiver = event.params.collector;
  const feeBps = event.params.bips;
  const feeId = generateFeeConfigId(event.params.id);
  const factoryId = generateFactoryId(event.address);
  // contract won't allow a fee config to be created if it exists
  let feeConfigEntity = new FeeConfigEntity(feeId);

  feeConfigEntity.basisPoints = BigInt.fromI32(feeBps);
  feeConfigEntity.feeConfigId = event.params.id;
  feeConfigEntity.collector = feeReceiver;
  feeConfigEntity.creationBlockNumber = event.block.number;
  feeConfigEntity.creationTransactionHash = event.transaction.hash;
  feeConfigEntity.factory = factoryId;
  
  feeConfigEntity.save();
}

export function handleFeeDestroyed(event: FeeDestroyedEvent): void {
  const feeConfigId = generateFeeConfigId(event.params.id);
  store.remove("FeeConfig", feeConfigId);
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  const newPendingOwner = event.params.newOwner;
  const previousOwner = event.params.previousOwner;
  const factoryId = generateFactoryId(event.address);
  let factoryEntity = SubscriptionTokenV1FactoryEntity.load(factoryId);
  if(factoryEntity == null) {
    log.error("SubscriptionTokenV1Factory Entity with ID {}, not created properly.", [factoryId]);
    return;
  }
  if(factoryEntity.owner != previousOwner) {
    log.error("Owner not indexed properly for event emitted at transaction hash: {}", [event.transaction.hash.toHexString()]);
    return;
  }
  factoryEntity.pendingOwner = newPendingOwner;
  factoryEntity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  // if the ownership is transferred fro 0x address to non zero address, the contract is deployed
  // OwnershipTransferred  event will only ever be emitted once where previous owner will be zero, this can never happen again
  const newOwner = event.params.newOwner;
  const previousOwner = event.params.previousOwner;
  const isOwnershipInitialised = previousOwner == Address.zero();
  const factoryEntityId = generateFactoryId(event.address);
  let factoryEntity = SubscriptionTokenV1FactoryEntity.load(factoryEntityId);
  if(isOwnershipInitialised) {
    if(factoryEntity == null) {
      // initialize factory
      factoryEntity = new SubscriptionTokenV1FactoryEntity(factoryEntityId);
  
      // set parameters
      factoryEntity.address = event.address;
      factoryEntity.pendingOwner = null;
      factoryEntity.deployFee = BigInt.fromI32(0);
      factoryEntity.totalFeesWithdrawn = BigInt.fromI32(0);
    }
    factoryEntity.owner = newOwner;
  
    factoryEntity.save()
  } else {
    if(factoryEntity == null) {
      log.error("SubscriptionTokenV1Factory Entity with ID {}, not created properly.", [factoryEntityId]);
      return;
    }
    factoryEntity.pendingOwner = null;
    factoryEntity.owner = newOwner;
    factoryEntity.save();
  }
}
