import { verifyAllCombinations3 } from "approvals/lib/Providers/Jest/CombinationApprovals";

import { GildedRose, Item } from "../src/gilded-rose.ts";

function calculateQuality(name: string, quality: number, sellIn: number) {
	const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
	const result = gildedRose.updateQuality();

	return JSON.stringify(result[0]);
}

describe("Gilded Rose", () => {
	it("should calculate quality", () => {
		const names = [
			"foo",
			"Sulfuras, Hand of Ragnaros",
			"Aged Brie",
			"Backstage passes to a TAFKAL80ETC concert",
		];
		const qualities = [0, 1, 2, 50];
		const sellIns = [-1, 0, 1, 11, 6];
		verifyAllCombinations3(calculateQuality, names, qualities, sellIns);
	});
});
