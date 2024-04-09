import { z } from "zod";

export const emptyDimensionalityParser = z.literal("empty");

export const scalarDimensionalityParser = z.literal("scalar");

export const relationalDimensionalityParser = z.literal("relational");
