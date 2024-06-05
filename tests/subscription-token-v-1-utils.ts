import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
  Withdraw
} from "../generated/SubscriptionTokenV1/SubscriptionTokenV1"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createFeeAllocatedEvent(tokens: BigInt): FeeAllocated {
  let feeAllocatedEvent = changetype<FeeAllocated>(newMockEvent())

  feeAllocatedEvent.parameters = new Array()

  feeAllocatedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )

  return feeAllocatedEvent
}

export function createFeeCollectorChangeEvent(
  from: Address,
  to: Address
): FeeCollectorChange {
  let feeCollectorChangeEvent = changetype<FeeCollectorChange>(newMockEvent())

  feeCollectorChangeEvent.parameters = new Array()

  feeCollectorChangeEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  feeCollectorChangeEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return feeCollectorChangeEvent
}

export function createFeeTransferEvent(
  from: Address,
  to: Address,
  tokensTransferred: BigInt
): FeeTransfer {
  let feeTransferEvent = changetype<FeeTransfer>(newMockEvent())

  feeTransferEvent.parameters = new Array()

  feeTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  feeTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  feeTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokensTransferred",
      ethereum.Value.fromUnsignedBigInt(tokensTransferred)
    )
  )

  return feeTransferEvent
}

export function createGrantEvent(
  account: Address,
  tokenId: BigInt,
  secondsGranted: BigInt,
  expiresAt: BigInt
): Grant {
  let grantEvent = changetype<Grant>(newMockEvent())

  grantEvent.parameters = new Array()

  grantEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  grantEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  grantEvent.parameters.push(
    new ethereum.EventParam(
      "secondsGranted",
      ethereum.Value.fromUnsignedBigInt(secondsGranted)
    )
  )
  grantEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )

  return grantEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent = changetype<OwnershipTransferStarted>(
    newMockEvent()
  )

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPurchaseEvent(
  account: Address,
  tokenId: BigInt,
  tokensTransferred: BigInt,
  timePurchased: BigInt,
  rewardPoints: BigInt,
  expiresAt: BigInt
): Purchase {
  let purchaseEvent = changetype<Purchase>(newMockEvent())

  purchaseEvent.parameters = new Array()

  purchaseEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam(
      "tokensTransferred",
      ethereum.Value.fromUnsignedBigInt(tokensTransferred)
    )
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam(
      "timePurchased",
      ethereum.Value.fromUnsignedBigInt(timePurchased)
    )
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam(
      "rewardPoints",
      ethereum.Value.fromUnsignedBigInt(rewardPoints)
    )
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam(
      "expiresAt",
      ethereum.Value.fromUnsignedBigInt(expiresAt)
    )
  )

  return purchaseEvent
}

export function createReferralCreatedEvent(
  id: BigInt,
  rewardBps: i32
): ReferralCreated {
  let referralCreatedEvent = changetype<ReferralCreated>(newMockEvent())

  referralCreatedEvent.parameters = new Array()

  referralCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  referralCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardBps",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rewardBps))
    )
  )

  return referralCreatedEvent
}

export function createReferralDestroyedEvent(id: BigInt): ReferralDestroyed {
  let referralDestroyedEvent = changetype<ReferralDestroyed>(newMockEvent())

  referralDestroyedEvent.parameters = new Array()

  referralDestroyedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return referralDestroyedEvent
}

export function createReferralPayoutEvent(
  tokenId: BigInt,
  referrer: Address,
  referralId: BigInt,
  rewardAmount: BigInt
): ReferralPayout {
  let referralPayoutEvent = changetype<ReferralPayout>(newMockEvent())

  referralPayoutEvent.parameters = new Array()

  referralPayoutEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  referralPayoutEvent.parameters.push(
    new ethereum.EventParam("referrer", ethereum.Value.fromAddress(referrer))
  )
  referralPayoutEvent.parameters.push(
    new ethereum.EventParam(
      "referralId",
      ethereum.Value.fromUnsignedBigInt(referralId)
    )
  )
  referralPayoutEvent.parameters.push(
    new ethereum.EventParam(
      "rewardAmount",
      ethereum.Value.fromUnsignedBigInt(rewardAmount)
    )
  )

  return referralPayoutEvent
}

export function createRefundEvent(
  account: Address,
  tokenId: BigInt,
  tokensTransferred: BigInt,
  timeReclaimed: BigInt
): Refund {
  let refundEvent = changetype<Refund>(newMockEvent())

  refundEvent.parameters = new Array()

  refundEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  refundEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  refundEvent.parameters.push(
    new ethereum.EventParam(
      "tokensTransferred",
      ethereum.Value.fromUnsignedBigInt(tokensTransferred)
    )
  )
  refundEvent.parameters.push(
    new ethereum.EventParam(
      "timeReclaimed",
      ethereum.Value.fromUnsignedBigInt(timeReclaimed)
    )
  )

  return refundEvent
}

export function createRefundTopUpEvent(tokensIn: BigInt): RefundTopUp {
  let refundTopUpEvent = changetype<RefundTopUp>(newMockEvent())

  refundTopUpEvent.parameters = new Array()

  refundTopUpEvent.parameters.push(
    new ethereum.EventParam(
      "tokensIn",
      ethereum.Value.fromUnsignedBigInt(tokensIn)
    )
  )

  return refundTopUpEvent
}

export function createRewardPointsSlashedEvent(
  account: Address,
  slasher: Address,
  rewardPointsSlashed: BigInt
): RewardPointsSlashed {
  let rewardPointsSlashedEvent = changetype<RewardPointsSlashed>(newMockEvent())

  rewardPointsSlashedEvent.parameters = new Array()

  rewardPointsSlashedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  rewardPointsSlashedEvent.parameters.push(
    new ethereum.EventParam("slasher", ethereum.Value.fromAddress(slasher))
  )
  rewardPointsSlashedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardPointsSlashed",
      ethereum.Value.fromUnsignedBigInt(rewardPointsSlashed)
    )
  )

  return rewardPointsSlashedEvent
}

export function createRewardWithdrawEvent(
  account: Address,
  tokensTransferred: BigInt
): RewardWithdraw {
  let rewardWithdrawEvent = changetype<RewardWithdraw>(newMockEvent())

  rewardWithdrawEvent.parameters = new Array()

  rewardWithdrawEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  rewardWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "tokensTransferred",
      ethereum.Value.fromUnsignedBigInt(tokensTransferred)
    )
  )

  return rewardWithdrawEvent
}

export function createRewardsAllocatedEvent(tokens: BigInt): RewardsAllocated {
  let rewardsAllocatedEvent = changetype<RewardsAllocated>(newMockEvent())

  rewardsAllocatedEvent.parameters = new Array()

  rewardsAllocatedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )

  return rewardsAllocatedEvent
}

export function createSupplyCapChangeEvent(supplyCap: BigInt): SupplyCapChange {
  let supplyCapChangeEvent = changetype<SupplyCapChange>(newMockEvent())

  supplyCapChangeEvent.parameters = new Array()

  supplyCapChangeEvent.parameters.push(
    new ethereum.EventParam(
      "supplyCap",
      ethereum.Value.fromUnsignedBigInt(supplyCap)
    )
  )

  return supplyCapChangeEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createTransferRecipientChangeEvent(
  recipient: Address
): TransferRecipientChange {
  let transferRecipientChangeEvent = changetype<TransferRecipientChange>(
    newMockEvent()
  )

  transferRecipientChangeEvent.parameters = new Array()

  transferRecipientChangeEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return transferRecipientChangeEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createWithdrawEvent(
  account: Address,
  tokensTransferred: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "tokensTransferred",
      ethereum.Value.fromUnsignedBigInt(tokensTransferred)
    )
  )

  return withdrawEvent
}
