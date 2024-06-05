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
  DeployFeeChange,
  DeployFeeTransfer,
  Deployment,
  FeeCreated,
  FeeDestroyed,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/schema"

export function handleDeployFeeChange(event: DeployFeeChangeEvent): void {
  let entity = new DeployFeeChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeployFeeTransfer(event: DeployFeeTransferEvent): void {
  let entity = new DeployFeeTransfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeployment(event: DeploymentEvent): void {
  let entity = new Deployment(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.deployment = event.params.deployment
  entity.feeId = event.params.feeId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeCreated(event: FeeCreatedEvent): void {
  let entity = new FeeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.SubscriptionTokenV1Factory_id = event.params.id
  entity.collector = event.params.collector
  entity.bips = event.params.bips

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeDestroyed(event: FeeDestroyedEvent): void {
  let entity = new FeeDestroyed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.SubscriptionTokenV1Factory_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
