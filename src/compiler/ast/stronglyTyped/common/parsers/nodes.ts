import { z } from "zod";

import { strongNodeKinds } from "../enumeration";

export const strongNodeKindParser = z.enum(strongNodeKinds);
