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
  Approval,
  ApprovalForAll,
  FeeAllocated,
  FeeCollectorChange,
  FeeTransfer,
  Grant,
  Initialized,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Paused,
  Purchase,
  ReferralCreated,
  ReferralDestroyed,
  ReferralPayout,
  Refund,
  RefundTopUp,
  RewardPointsSlashed,
  RewardWithdraw,
  RewardsAllocated,
  SupplyCapChange,
  Transfer,
  TransferRecipientChange,
  Unpaused,
  Withdraw,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeAllocated(event: FeeAllocatedEvent): void {
  let entity = new FeeAllocated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokens = event.params.tokens

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeCollectorChange(event: FeeCollectorChangeEvent): void {
  let entity = new FeeCollectorChange(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeTransfer(event: FeeTransferEvent): void {
  let entity = new FeeTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokensTransferred = event.params.tokensTransferred

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGrant(event: GrantEvent): void {
  let entity = new Grant(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.tokenId = event.params.tokenId
  entity.secondsGranted = event.params.secondsGranted
  entity.expiresAt = event.params.expiresAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent,
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePurchase(event: PurchaseEvent): void {
  let entity = new Purchase(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.tokenId = event.params.tokenId
  entity.tokensTransferred = event.params.tokensTransferred
  entity.timePurchased = event.params.timePurchased
  entity.rewardPoints = event.params.rewardPoints
  entity.expiresAt = event.params.expiresAt

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReferralCreated(event: ReferralCreatedEvent): void {
  let entity = new ReferralCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.SubscriptionTokenV1_id = event.params.id
  entity.rewardBps = event.params.rewardBps

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReferralDestroyed(event: ReferralDestroyedEvent): void {
  let entity = new ReferralDestroyed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.SubscriptionTokenV1_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReferralPayout(event: ReferralPayoutEvent): void {
  let entity = new ReferralPayout(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokenId = event.params.tokenId
  entity.referrer = event.params.referrer
  entity.referralId = event.params.referralId
  entity.rewardAmount = event.params.rewardAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRefund(event: RefundEvent): void {
  let entity = new Refund(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.tokenId = event.params.tokenId
  entity.tokensTransferred = event.params.tokensTransferred
  entity.timeReclaimed = event.params.timeReclaimed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRefundTopUp(event: RefundTopUpEvent): void {
  let entity = new RefundTopUp(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokensIn = event.params.tokensIn

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardPointsSlashed(
  event: RewardPointsSlashedEvent,
): void {
  let entity = new RewardPointsSlashed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.slasher = event.params.slasher
  entity.rewardPointsSlashed = event.params.rewardPointsSlashed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardWithdraw(event: RewardWithdrawEvent): void {
  let entity = new RewardWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.tokensTransferred = event.params.tokensTransferred

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsAllocated(event: RewardsAllocatedEvent): void {
  let entity = new RewardsAllocated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.tokens = event.params.tokens

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSupplyCapChange(event: SupplyCapChangeEvent): void {
  let entity = new SupplyCapChange(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.supplyCap = event.params.supplyCap

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferRecipientChange(
  event: TransferRecipientChangeEvent,
): void {
  let entity = new TransferRecipientChange(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.tokensTransferred = event.params.tokensTransferred

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
