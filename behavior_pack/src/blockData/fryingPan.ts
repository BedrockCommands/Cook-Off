import { BlockData } from "./blockDataManager";

export interface FryingPanBlockData extends BlockData {
	items: Array<string>
}

export function getDefaultFryingPanBlockData(): FryingPanBlockData {
	return { items: [] };
};