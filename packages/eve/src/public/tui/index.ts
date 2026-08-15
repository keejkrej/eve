import { runDevelopmentTui as runInternalDevelopmentTui } from "../../cli/dev/tui/tui.js";

import type { RunDevelopmentTuiInput } from "./types.js";

/** Runs eve's interactive development terminal UI against an existing server. */
export function runDevelopmentTui(input: RunDevelopmentTuiInput): Promise<void> {
  return runInternalDevelopmentTui(input);
}

export type {
  DevelopmentTuiDisplayOptions,
  DevelopmentTuiModelCommand,
  DevelopmentTuiModelCommandInput,
  DevelopmentTuiMultiSelectOptions,
  DevelopmentTuiPromptValue,
  DevelopmentTuiPrompter,
  DevelopmentTuiSelectOption,
  DevelopmentTuiSingleSelectOptions,
  DevelopmentTuiTarget,
  RunDevelopmentTuiInput,
} from "./types.js";
