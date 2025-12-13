import { Block, BlockPermutation } from "@minecraft/server";
import { BlockId } from "../../constants/blockId";
import { ComponentManager } from "../componentManager";
import { BlockStateSuperset } from "@minecraft/vanilla-data";

const RelativePositionStateName = "bcc.cook:relative_position" as keyof BlockStateSuperset;

enum RelativePostion {
	Top = "top",
	Bottom = "bottom"
}

ComponentManager.registerBlockComponent(BlockId.fridge, {
	beforeOnPlayerPlace: (event) => {
		const block = event.block;
		const otherBlock = getOtherFridgeBlock(block);
		if (otherBlock === undefined) return;

		if (!otherBlock.isAir && !otherBlock.isLiquid) event.cancel = true;
	},
	onPlace: (event) => {
		const block = event.block;
		const relativePosition = getRelativePosition(block.permutation);
		const otherBlock = getOtherFridgeBlock(block, relativePosition);
		if (otherBlock === undefined) return;

		const otherRelativePositon = getOtherRelativePosition(relativePosition);

		otherBlock.setPermutation(block.permutation.withState(RelativePositionStateName, otherRelativePositon));
	},
	onPlayerBreak: (event) => {
		const block = event.block;
		const permutation = event.brokenBlockPermutation;
		const relativePosition = getRelativePosition(permutation);
		const otherBlock = getOtherFridgeBlock(block, relativePosition);
		if (otherBlock === undefined) return;

		otherBlock.setType("minecraft:air");
	}
});

function getOtherFridgeBlock(fridgeBlock: Block, relativePosition?: RelativePostion): Block | undefined {
	if (relativePosition === undefined) relativePosition = getRelativePosition(fridgeBlock.permutation);
	const otherBlock = relativePosition === RelativePostion.Top ? fridgeBlock.below() : fridgeBlock.above();
	return otherBlock;
}

function getRelativePosition(fridgeBlockPermutation: BlockPermutation): RelativePostion {
	return fridgeBlockPermutation.getState(RelativePositionStateName) as RelativePostion;
}

function getOtherRelativePosition(relativePosition: RelativePostion): RelativePostion {
	if (relativePosition === RelativePostion.Top) return RelativePostion.Bottom;
	return RelativePostion.Top;
}