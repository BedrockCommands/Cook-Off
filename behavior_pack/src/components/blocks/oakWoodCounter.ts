import { Block, Dimension, world } from "@minecraft/server";
import { BlockId } from "../../constants/blockId";
import { Vector } from "../../utils/vector";
import { ComponentManager } from "../componentManager";
import { setBlockState } from "../../utils/general";
import { BlockStateSuperset } from "@minecraft/vanilla-data";

const axisOffsetMap = {
	"north": new Vector(-1, 0, 0),
	"south": new Vector(1, 0, 0),
	"east": new Vector(0, 0, 1),
	"west": new Vector(0, 0, -1)
};
const RelativePositionStateName = "bcc.cook:relative_position" as keyof BlockStateSuperset;

enum FacingDirection {
	North = "north",
	South = "south",
	East = "east",
	West = "west"
}

ComponentManager.registerBlockComponent(BlockId.oakWoodCounter, {
	onPlace: (event) => {
		const block = event.block;
		updateDisplay(block);
	},
	onPlayerBreak: (event) => {
		const block = event.block;
		const blockLocation = Vector.from(block.location);
		const blockPermutation = event.brokenBlockPermutation;
		const dimension = event.dimension;
		const facingDirection = blockPermutation.getState("minecraft:cardinal_direction") as FacingDirection;
		const axisOffset = axisOffsetMap[facingDirection];
		updateNeighbors(dimension, blockLocation, axisOffset, 0);
	}
});

function updateDisplay(block: Block) {
	const facingDirection = block.permutation.getState("minecraft:cardinal_direction") as FacingDirection;
	const axisOffset = axisOffsetMap[facingDirection];
	const dimension = block.dimension;
	const blockLocation = Vector.from(block.location);

	if (block.typeId === BlockId.oakWoodCounter) setRelativePosition(block, axisOffset);

	updateNeighbors(dimension, blockLocation, axisOffset, 0);
}

function updateNeighbors(dimension: Dimension, blockLocation: Vector, axisOffset: Vector, direction: number) {
	if (direction === 0) {
		const leftBlockLocation = blockLocation.subtract(axisOffset);
		const leftBlock = dimension.getBlock(leftBlockLocation);
		const rightBlockLocation = blockLocation.add(axisOffset);
		const rightBlock = dimension.getBlock(rightBlockLocation);
		if (leftBlock && leftBlock.typeId === BlockId.oakWoodCounter) {
			setRelativePosition(leftBlock, axisOffset);
			updateNeighbors(dimension, leftBlockLocation, axisOffset, -1);
		}
		if (rightBlock && rightBlock.typeId === BlockId.oakWoodCounter) {
			setRelativePosition(rightBlock, axisOffset);
			updateNeighbors(dimension, rightBlockLocation, axisOffset, 1);
		}
	}

	if (direction === -1) {
		const leftBlockLocation = blockLocation.subtract(axisOffset);
		const leftBlock = dimension.getBlock(leftBlockLocation);
		if (leftBlock && leftBlock.typeId === BlockId.oakWoodCounter) {
			setRelativePosition(leftBlock, axisOffset);
			updateNeighbors(dimension, leftBlockLocation, axisOffset, -1);
		}
	}

	if (direction == 1) {
		const rightBlockLocation = blockLocation.add(axisOffset);
		const rightBlock = dimension.getBlock(rightBlockLocation);
		if (rightBlock && rightBlock.typeId === BlockId.oakWoodCounter) {
			setRelativePosition(rightBlock, axisOffset);
			updateNeighbors(dimension, rightBlockLocation, axisOffset, 1);
		}
	}
}

function setRelativePosition(block: Block, axisOffset: Vector): void {
	const blockLocation = Vector.from(block.location);
	const dimension = block.dimension;
	const leftBlock = dimension.getBlock(blockLocation.subtract(axisOffset));
	const rightBlock = dimension.getBlock(blockLocation.add(axisOffset));
	if (leftBlock === undefined || rightBlock === undefined) return;

	if (leftBlock.typeId === BlockId.oakWoodCounter && rightBlock.typeId !== BlockId.oakWoodCounter) setBlockState(block, RelativePositionStateName, "right");
	else if (leftBlock.typeId === BlockId.oakWoodCounter && rightBlock.typeId === BlockId.oakWoodCounter) setBlockState(block, RelativePositionStateName, "middle");
	else if (leftBlock.typeId !== BlockId.oakWoodCounter && rightBlock.typeId === BlockId.oakWoodCounter) setBlockState(block, RelativePositionStateName, "left");
	else setBlockState(block, RelativePositionStateName, "middle"); // No neighboring oak wood counters to connect with.
}