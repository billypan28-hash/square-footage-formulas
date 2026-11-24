# Square Footage & Construction Material Formulas (JS / Python)

Zero-dependency JavaScript (ESM) and Python reference implementations for common US home-improvement area, waste allowance, roof pitch, sod/fertilizer, and cubic-yard calculations—powering the free browser-local tools at **[squarefootage.online](https://squarefootage.online/)**.

## Included Formulas

- **Feet + Inches to Decimal Feet**: Avoids the classic `12 ft 6 in != 12.6 ft` conversion bug (`12 + 6/12 = 12.5 ft`).
- **Multi-Room & L-Shaped Area Summing**: Rectangle, triangle, and circle areas with configurable cutting waste (`0%–25%`).
- **Flooring Cartons**: Net sq ft → waste-adjusted sq ft → whole boxes rounded up.
- **Tile Piece & Carton Count**: Tile width × length (inches) ÷ 144 → exact piece count and full boxes.
- **Roof Pitch Surface Area & Shingle Bundles**: Ground footprint + eave overhangs × exact Pythagorean pitch factor $\sqrt{1 + (\text{rise}/12)^2}$, converted into 100 sq ft roofing squares and 3 bundles/square.
- **Lawn Area, Acres, Sod Rolls & Fertilizer**: Multi-zone yard summing, `sq ft ÷ 43,560` acres, 9 sq ft sod rolls, 450 sq ft pallets, and lbs per 1,000 sq ft fertilizer.
- **Cubic Yards from Area + Depth (inches)**: `(L × W × (depthIn / 12)) / 27` for concrete slabs, mulch, and gravel.

## Quick Usage (JavaScript ESM)

```js
import {
  feetInchesToDecimal,
  multiRoomTotal,
  roofSurfaceAndShingles
} from "./index.mjs";

// L-shaped room: 16x12 + 8x6 with 10% flooring waste
const room = multiRoomTotal([
  { lengthFt: 16, widthFt: 12 },
  { lengthFt: 8, widthFt: 6 }
], 10);
// => { netSqFt: 240, totalWithWaste: 264, ... }

// 45x30 ft house, 1.5 ft overhang, 6/12 pitch, 10% waste
const roof = roofSurfaceAndShingles(45, 30, 1.5, 6, 10);
// => { footprintSqFt: 1584, pitchMultiplier: 1.118..., shingleBundles: 59 }
```

Run tests locally with Node 18+:

```bash
node --test test.mjs
```

## Roof Pitch Multiplier Quick Table

| Pitch (Rise/12) | Angle | Multiplier |
|---|---:|---:|
| 3/12 | 14.0° | `1.031×` |
| 4/12 | 18.4° | `1.054×` |
| 5/12 | 22.6° | `1.083×` |
| 6/12 | 26.6° | `1.118×` |
| 8/12 | 33.7° | `1.202×` |
| 10/12 | 39.8° | `1.302×` |
| 12/12 | 45.0° | `1.414×` |

## Interactive Web Tools & Guides

Prefer a fast mobile-friendly calculator in your browser (100% client-side, no login)?

- [Square Footage Calculator](https://squarefootage.online/) — Multi-room area, `ft + in`, waste slider, boxes & cost
- [Flooring Square Footage Calculator](https://squarefootage.online/flooring-square-footage-calculator) — Hardwood, LVP & laminate cartons
- [Tile Square Footage Calculator](https://squarefootage.online/tile-square-footage-calculator) — Piece counts & boxes by tile dimensions
- [Roof Square Footage Calculator](https://squarefootage.online/roof-square-footage-calculator) — Pitch multiplier, roofing squares & shingle bundles
- [Lawn Square Footage Calculator](https://squarefootage.online/lawn-square-footage-calculator) — Acres, sod rolls, pallets & fertilizer weight
- [Cubic Yard Calculator](https://squarefootage.online/cubic-yard-calculator) — Concrete slabs, mulch & gravel volume
- Guides: [How to Calculate Square Footage of a Room](https://squarefootage.online/how-to-calculate-square-footage-of-a-room) · [How to Measure Square Footage](https://squarefootage.online/how-to-measure-square-footage)

## License

MIT
