import { verify } from "approvals/lib/Providers/Jest/JestApprovals";

import { GildedRose, Item } from "../src/gilded-rose.ts";

describe("Gilded Rose", () => {
	it("should foo", () => {
		const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
		const items = gildedRose.updateQuality();
		verify(items[0].name);
	});
});
