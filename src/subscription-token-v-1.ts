import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  FeeAllocated as FeeAllocatedEvent,
  FeeCollectorChange as FeeCollectorChangeEvent,
  FeeTransfer as FeeTransferEvent,
  Grant as GrantEvent,
  Initialized as InitializedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Purchase as PurchaseEvent,
  ReferralCreated as ReferralCreatedEvent,
  ReferralDestroyed as ReferralDestroyedEvent,
  ReferralPayout as ReferralPayoutEvent,
  Refund as RefundEvent,
  RefundTopUp as RefundTopUpEvent,
  RewardPointsSlashed as RewardPointsSlashedEvent,
  RewardWithdraw as RewardWithdrawEvent,
  RewardsAllocated as RewardsAllocatedEvent,
  SupplyCapChange as SupplyCapChangeEvent,
  Transfer as TransferEvent,
  TransferRecipientChange as TransferRecipientChangeEvent,
  Unpaused as UnpausedEvent,
  Withdraw as WithdrawEvent,
} from "../generated/SubscriptionTokenV1/SubscriptionTokenV1"
import {
  HypersubSubscription as HypersubSubscriptionEntity,
  SubscriptionTokenV1 as SubscriptionTokenV1Entity
} from "../generated/schema"
import { generateHypersubEntityId } from "./subscription-token-v-1-factory"

export function handleGrant(event: GrantEvent): void {
  const subscriptionId = generateSubscriptionId(event.params.account, event.address, event.params.tokenId);
  const hypersubId = generateHypersubEntityId(event.address);
  // a user can purchase more seconds to same subscription ID, hence check if a subscription already exists or not
  let subscriptionEntity = HypersubSubscriptionEntity.load(subscriptionId);
  if(subscriptionEntity == null) {
    // create a new one
    subscriptionEntity = new HypersubSubscriptionEntity(subscriptionId);
    // set initial params
    subscriptionEntity.tokenId = event.params.tokenId;
    subscriptionEntity.subscriber = event.params.account;
    subscriptionEntity.secondsPurchased = BigInt.zero();
    subscriptionEntity.secondsGranted = BigInt.zero();
    subscriptionEntity.hypersub = hypersubId;
  }
  subscriptionEntity.secondsGranted = subscriptionEntity.secondsGranted.plus(event.params.secondsGranted);;  
  subscriptionEntity.lastUpdateBlockNumber = event.block.number;
  subscriptionEntity.lastUpdateTrxHash = event.transaction.hash;
  subscriptionEntity.expiresAt = event.params.expiresAt;
  subscriptionEntity.save()
}

// @note: This handler is only to check an assumption that when creating a contract to index from template, which event is indexed first.
// The Assumption is The contract is created in Deployment handler, hence the only event to index after will be Initialized,
// even though, Initialized event will be emitted before Deployment, hence graph will index Initialized firs.
export function handleInitialized(event: InitializedEvent): void {
  let hypersubEntity = SubscriptionTokenV1Entity.load(generateHypersubEntityId(event.address));
  if(hypersubEntity == null) {
    log.error("Hypersub Entity not created. Hence Initialized event is indexed before Deployment Event. ID: {}", [generateHypersubEntityId(event.address)]);
  }

  log.error("Hypersub Entity created. Hence Initialized event is indexed after Deployment Event. ID: {}", [generateHypersubEntityId(event.address)]);
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent,
): void {
  const hypersubId = generateHypersubEntityId(event.address);
  let hypersubEntity = SubscriptionTokenV1Entity.load(hypersubId);
  if(hypersubEntity == null) {
    log.error("Hypersub Entity not created. ID: {}", [hypersubId]);
    return;
  }
  hypersubEntity.pendingOwner = event.params.newOwner;
  hypersubEntity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  const hypersubId = generateHypersubEntityId(event.address);
  let hypersubEntity = SubscriptionTokenV1Entity.load(hypersubId);
  if(hypersubEntity == null) {
    log.error("Hypersub Entity not created. ID: {}", [hypersubId]);
    return;
  }
  hypersubEntity.owner = event.params.newOwner;
  hypersubEntity.pendingOwner = null;
  hypersubEntity.save();
}

export function handlePaused(event: PausedEvent): void {
  const hypersubId = generateHypersubEntityId(event.address);
  let hypersubEntity = SubscriptionTokenV1Entity.load(hypersubId);
  if(hypersubEntity == null) {
    log.error("Hypersub Entity not created. ID: {}", [hypersubId]);
    return;
  }
  hypersubEntity.isPaused = true;
  hypersubEntity.save();
}

export function generateSubscriptionId(account: Address, hypersub: Address, tokenId: BigInt): string {
  return `${account.toHexString()}-${hypersub.toHexString()}-${tokenId.toHexString()}`;
}

export function handlePurchase(event: PurchaseEvent): void {
  const subscriptionId = generateSubscriptionId(event.params.account, event.address, event.params.tokenId);
  const hypersubId = generateHypersubEntityId(event.address);
  // a user can purchase more seconds to same subscription ID, hence check if a subscription already exists or not
  let subscriptionEntity = HypersubSubscriptionEntity.load(subscriptionId);
  if(subscriptionEntity == null) {
    // create a new one
    subscriptionEntity = new HypersubSubscriptionEntity(subscriptionId);
    
    // set initial params
    subscriptionEntity.tokenId = event.params.tokenId;
    subscriptionEntity.subscriber = event.params.account;
    subscriptionEntity.secondsPurchased = BigInt.zero();
    subscriptionEntity.secondsGranted = BigInt.zero();
    subscriptionEntity.hypersub = hypersubId;
  }
  subscriptionEntity.secondsPurchased = subscriptionEntity.secondsPurchased.plus(event.params.timePurchased);  
  subscriptionEntity.lastUpdateBlockNumber = event.block.number;
  subscriptionEntity.lastUpdateTrxHash = event.transaction.hash;
  subscriptionEntity.expiresAt = event.params.expiresAt;
  subscriptionEntity.save()
}

// export function handleReferralCreated(event: ReferralCreatedEvent): void {
//   let entity = new ReferralCreated(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.SubscriptionTokenV1_id = event.params.id
//   entity.rewardBps = event.params.rewardBps

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleReferralDestroyed(event: ReferralDestroyedEvent): void {
//   let entity = new ReferralDestroyed(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.SubscriptionTokenV1_id = event.params.id

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleReferralPayout(event: ReferralPayoutEvent): void {
//   let entity = new ReferralPayout(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.tokenId = event.params.tokenId
//   entity.referrer = event.params.referrer
//   entity.referralId = event.params.referralId
//   entity.rewardAmount = event.params.rewardAmount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRefund(event: RefundEvent): void {
//   let entity = new Refund(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.account = event.params.account
//   entity.tokenId = event.params.tokenId
//   entity.tokensTransferred = event.params.tokensTransferred
//   entity.timeReclaimed = event.params.timeReclaimed

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRefundTopUp(event: RefundTopUpEvent): void {
//   let entity = new RefundTopUp(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.tokensIn = event.params.tokensIn

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRewardPointsSlashed(
//   event: RewardPointsSlashedEvent,
// ): void {
//   let entity = new RewardPointsSlashed(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.account = event.params.account
//   entity.slasher = event.params.slasher
//   entity.rewardPointsSlashed = event.params.rewardPointsSlashed

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRewardWithdraw(event: RewardWithdrawEvent): void {
//   let entity = new RewardWithdraw(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.account = event.params.account
//   entity.tokensTransferred = event.params.tokensTransferred

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRewardsAllocated(event: RewardsAllocatedEvent): void {
//   let entity = new RewardsAllocated(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.tokens = event.params.tokens

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleSupplyCapChange(event: SupplyCapChangeEvent): void {
//   let entity = new SupplyCapChange(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.supplyCap = event.params.supplyCap

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.tokenId = event.params.tokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleTransferRecipientChange(
//   event: TransferRecipientChangeEvent,
// ): void {
//   let entity = new TransferRecipientChange(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.recipient = event.params.recipient

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

export function handleUnpaused(event: UnpausedEvent): void {
  const hypersubId = generateHypersubEntityId(event.address);
  let hypersubEntity = SubscriptionTokenV1Entity.load(hypersubId);
  if(hypersubEntity == null) {
    log.error("Hypersub Entity not created. ID: {}", [hypersubId]);
    return;
  }
  hypersubEntity.isPaused = false;
  hypersubEntity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  const hypersubId = generateHypersubEntityId(event.address);
  let hypersubEntity = SubscriptionTokenV1Entity.load(hypersubId);
  if(hypersubEntity == null) {
    log.error("Hypersub Entity not created. ID: {}", [hypersubId]);
    return;
  }
  hypersubEntity.totalWithdrawn = hypersubEntity.totalWithdrawn.plus(event.params.tokensTransferred);
  hypersubEntity.save();
}
