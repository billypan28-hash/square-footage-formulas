// Zero-dependency US construction & home-improvement area/volume formulas (MIT License)
// Live interactive calculators: https://squarefootage.online/

export function feetInchesToDecimal(feet = 0, inches = 0) {
  return Number(feet) + Number(inches) / 12;
}

export function rectAreaSqFt(lengthFt, widthFt) {
  return Math.max(0, Number(lengthFt) * Number(widthFt));
}

export function triangleAreaSqFt(baseFt, heightFt) {
  return Math.max(0, 0.5 * Number(baseFt) * Number(heightFt));
}

export function circleAreaSqFt(diameterFt) {
  const r = Math.max(0, Number(diameterFt) / 2);
  return Math.PI * r * r;
}

export function multiRoomTotal(rooms = [], wastePercent = 10) {
  const netSqFt = rooms.reduce((sum, r) => {
    const shape = r.shape || "rect";
    const a = feetInchesToDecimal(r.lengthFt ?? r.a ?? 0, r.lengthIn ?? 0);
    const b = feetInchesToDecimal(r.widthFt ?? r.b ?? 0, r.widthIn ?? 0);
    if (shape === "circle") return sum + circleAreaSqFt(a);
    if (shape === "triangle") return sum + triangleAreaSqFt(a, b);
    return sum + rectAreaSqFt(a, b);
  }, 0);
  const totalWithWaste = netSqFt * (1 + Number(wastePercent) / 100);
  return {
    netSqFt,
    totalWithWaste,
    sqMeters: totalWithWaste * 0.09290304,
    sqYards: totalWithWaste / 9
  };
}

function ceilSafe(n) {
  return Math.ceil(n - 1e-9);
}

export function flooringBoxes(netSqFt, wastePercent = 10, sqFtPerBox = 22) {
  const totalSqFt = Math.max(0, Number(netSqFt)) * (1 + Number(wastePercent) / 100);
  return {
    totalSqFt,
    boxes: ceilSafe(totalSqFt / Number(sqFtPerBox))
  };
}

export function tileEstimate(netSqFt, tileWidthIn = 12, tileLengthIn = 24, wastePercent = 12, sqFtPerBox = 15) {
  const totalSqFt = Math.max(0, Number(netSqFt)) * (1 + Number(wastePercent) / 100);
  const sqFtPerTile = (Number(tileWidthIn) * Number(tileLengthIn)) / 144;
  return {
    totalSqFt,
    sqFtPerTile,
    tiles: ceilSafe(totalSqFt / sqFtPerTile),
    boxes: ceilSafe(totalSqFt / Number(sqFtPerBox))
  };
}

export function roofPitchMultiplier(riseOver12 = 6) {
  const ratio = Number(riseOver12) / 12;
  return Math.sqrt(1 + ratio * ratio);
}

export function roofSurfaceAndShingles(houseLengthFt, houseWidthFt, overhangFt = 1.5, riseOver12 = 6, wastePercent = 10) {
  const adjL = Math.max(0, Number(houseLengthFt) + 2 * Number(overhangFt));
  const adjW = Math.max(0, Number(houseWidthFt) + 2 * Number(overhangFt));
  const footprintSqFt = adjL * adjW;
  const pitchMultiplier = roofPitchMultiplier(riseOver12);
  const surfaceSqFt = footprintSqFt * pitchMultiplier;
  const orderSqFt = surfaceSqFt * (1 + Number(wastePercent) / 100);
  const roofingSquares = orderSqFt / 100;
  const shingleBundles = ceilSafe(roofingSquares * 3);
  return { footprintSqFt, pitchMultiplier, surfaceSqFt, orderSqFt, roofingSquares, shingleBundles };
}

export function lawnSodAndFertilizer(sections = [], wastePercent = 10, sqFtPerRoll = 9, fertLbsPer1000 = 3) {
  const netSqFt = sections.reduce((sum, s) => sum + rectAreaSqFt(s.lengthFt, s.widthFt), 0);
  const withWaste = netSqFt * (1 + Number(wastePercent) / 100);
  return {
    netSqFt,
    acres: netSqFt / 43560,
    sodRolls: ceilSafe(withWaste / Number(sqFtPerRoll)),
    sodPallets: ceilSafe(withWaste / 450),
    fertilizerLbs: (netSqFt / 1000) * Number(fertLbsPer1000)
  };
}

export function cubicYardsFromAreaAndInches(lengthFt, widthFt, depthIn) {
  const cuFt = rectAreaSqFt(lengthFt, widthFt) * (Math.max(0, Number(depthIn)) / 12);
  return {
    cubicFeet: cuFt,
    cubicYards: cuFt / 27,
    cubicMeters: cuFt * 0.0283168466
  };
}
