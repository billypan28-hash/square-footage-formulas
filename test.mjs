import test from "node:test";
import assert from "node:assert/strict";
import {
  feetInchesToDecimal,
  multiRoomTotal,
  flooringBoxes,
  tileEstimate,
  roofPitchMultiplier,
  roofSurfaceAndShingles,
  lawnSodAndFertilizer,
  cubicYardsFromAreaAndInches
} from "./index.mjs";

test("feetInchesToDecimal avoids the 12 ft 6 in = 12.6 ft mistake", () => {
  assert.equal(feetInchesToDecimal(12, 6), 12.5);
  assert.equal(feetInchesToDecimal(10, 3), 10.25);
});

test("multiRoomTotal sums L-shaped rooms and adds 10% waste", () => {
  const res = multiRoomTotal([
    { lengthFt: 16, widthFt: 12 },
    { lengthFt: 8, widthFt: 6 }
  ], 10);
  assert.equal(res.netSqFt, 240);
  assert.ok(Math.abs(res.totalWithWaste - 264) < 1e-9);
});

test("flooringBoxes and tileEstimate round up to whole cartons", () => {
  assert.equal(flooringBoxes(144, 10, 22).boxes, 8);
  const t = tileEstimate(100, 12, 24, 10, 15);
  assert.equal(t.sqFtPerTile, 2);
  assert.equal(t.tiles, 55);
  assert.equal(t.boxes, 8);
});

test("roofPitchMultiplier & roofSurfaceAndShingles match standard US roofing math", () => {
  assert.ok(Math.abs(roofPitchMultiplier(6) - 1.1180339887) < 1e-6);
  assert.ok(Math.abs(roofPitchMultiplier(12) - Math.SQRT2) < 1e-9);
  const r = roofSurfaceAndShingles(45, 30, 1.5, 6, 10);
  assert.equal(r.footprintSqFt, 1584);
  assert.equal(r.shingleBundles, 59);
});

test("lawnSodAndFertilizer and cubicYardsFromAreaAndInches", () => {
  const lawn = lawnSodAndFertilizer([{ lengthFt: 40, widthFt: 25 }, { lengthFt: 50, widthFt: 30 }], 10, 9, 3);
  assert.equal(lawn.netSqFt, 2500);
  assert.equal(lawn.sodRolls, 306);
  assert.equal(lawn.fertilizerLbs, 7.5);

  const slab = cubicYardsFromAreaAndInches(20, 20, 4);
  assert.ok(Math.abs(slab.cubicYards - 4.9382716) < 1e-5);
});
