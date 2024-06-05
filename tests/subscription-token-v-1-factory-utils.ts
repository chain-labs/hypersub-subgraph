import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DeployFeeChange,
  DeployFeeTransfer,
  Deployment,
  FeeCreated,
  FeeDestroyed,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/SubscriptionTokenV1Factory/SubscriptionTokenV1Factory"

export function createDeployFeeChangeEvent(amount: BigInt): DeployFeeChange {
  let deployFeeChangeEvent = changetype<DeployFeeChange>(newMockEvent())

  deployFeeChangeEvent.parameters = new Array()

  deployFeeChangeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return deployFeeChangeEvent
}

export function createDeployFeeTransferEvent(
  recipient: Address,
  amount: BigInt
): DeployFeeTransfer {
  let deployFeeTransferEvent = changetype<DeployFeeTransfer>(newMockEvent())

  deployFeeTransferEvent.parameters = new Array()

  deployFeeTransferEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  deployFeeTransferEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return deployFeeTransferEvent
}

export function createDeploymentEvent(
  deployment: Address,
  feeId: BigInt
): Deployment {
  let deploymentEvent = changetype<Deployment>(newMockEvent())

  deploymentEvent.parameters = new Array()

  deploymentEvent.parameters.push(
    new ethereum.EventParam(
      "deployment",
      ethereum.Value.fromAddress(deployment)
    )
  )
  deploymentEvent.parameters.push(
    new ethereum.EventParam("feeId", ethereum.Value.fromUnsignedBigInt(feeId))
  )

  return deploymentEvent
}

export function createFeeCreatedEvent(
  id: BigInt,
  collector: Address,
  bips: i32
): FeeCreated {
  let feeCreatedEvent = changetype<FeeCreated>(newMockEvent())

  feeCreatedEvent.parameters = new Array()

  feeCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  feeCreatedEvent.parameters.push(
    new ethereum.EventParam("collector", ethereum.Value.fromAddress(collector))
  )
  feeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "bips",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(bips))
    )
  )

  return feeCreatedEvent
}

export function createFeeDestroyedEvent(id: BigInt): FeeDestroyed {
  let feeDestroyedEvent = changetype<FeeDestroyed>(newMockEvent())

  feeDestroyedEvent.parameters = new Array()

  feeDestroyedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return feeDestroyedEvent
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
