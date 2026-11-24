"""Zero-dependency US construction & home-improvement area/volume formulas (MIT License).
Interactive web calculators: https://squarefootage.online/
"""

import math


def feet_inches_to_decimal(feet: float = 0.0, inches: float = 0.0) -> float:
    return float(feet) + float(inches) / 12.0


def roof_pitch_multiplier(rise_over_12: float = 6.0) -> float:
    ratio = float(rise_over_12) / 12.0
    return math.sqrt(1.0 + ratio * ratio)


def flooring_boxes(net_sq_ft: float, waste_percent: float = 10.0, sq_ft_per_box: float = 22.0) -> dict:
    total = max(0.0, float(net_sq_ft)) * (1.0 + float(waste_percent) / 100.0)
    return {"total_sq_ft": total, "boxes": math.ceil(total / float(sq_ft_per_box))}


def roof_surface_and_shingles(
    house_length_ft: float,
    house_width_ft: float,
    overhang_ft: float = 1.5,
    rise_over_12: float = 6.0,
    waste_percent: float = 10.0,
) -> dict:
    footprint = max(0.0, house_length_ft + 2 * overhang_ft) * max(0.0, house_width_ft + 2 * overhang_ft)
    mult = roof_pitch_multiplier(rise_over_12)
    surface = footprint * mult
    order_sq_ft = surface * (1.0 + waste_percent / 100.0)
    squares = order_sq_ft / 100.0
    return {
        "footprint_sq_ft": footprint,
        "pitch_multiplier": mult,
        "surface_sq_ft": surface,
        "roofing_squares": squares,
        "shingle_bundles": math.ceil(squares * 3.0),
    }


def cubic_yards_from_inches(length_ft: float, width_ft: float, depth_in: float) -> dict:
    cu_ft = max(0.0, length_ft * width_ft) * (max(0.0, depth_in) / 12.0)
    return {"cubic_feet": cu_ft, "cubic_yards": cu_ft / 27.0}
