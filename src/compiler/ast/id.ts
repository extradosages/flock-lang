import { v4 } from "uuid";
import { z } from "zod";

export const idParser = z.string();

export const id = () => v4();
