import { expect } from "chai";
import { shuffle } from "../src/shuffle.js";

describe("shuffle", () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("returns an array of the same length", () => {
    expect(shuffle(cards)).to.have.lengthOf(cards.length);
  });

  it("keeps every original item", () => {
    expect(shuffle(cards)).to.have.members(cards);
  });

  it("shuffles the indexes of the array", () => {
    // A single shuffle can match the original order by chance (1 in 10!),
    // so try several times and expect at least one different ordering.
    const reordered = Array.from({ length: 10 }, () => shuffle(cards)).some(
      (result) => result.join() !== cards.join(),
    );
    expect(reordered).to.be.true;
  });

  it("does not mutate the original array", () => {
    const original = [...cards];
    shuffle(cards);
    expect(cards).to.deep.equal(original);
  });

  it("returns an empty array when given an empty array", () => {
    expect(shuffle([])).to.deep.equal([]);
  });

  it("returns the same single item for a one-item array", () => {
    expect(shuffle(["a"])).to.deep.equal(["a"]);
  });
});
