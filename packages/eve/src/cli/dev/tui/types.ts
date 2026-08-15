import type { LogDisplayMode } from "./log-display-mode.js";
import type { DevelopmentTuiDisplayOptions } from "../../../public/tui/types.js";

export type { LogDisplayMode };

/**
 * Controls how terminal UI sections for stream parts are displayed.
 */
export type TerminalPartDisplayMode = "full" | "collapsed" | "auto-collapsed" | "hidden";

/**
 * Controls which usage statistic is shown for assistant responses.
 */
export type AssistantResponseStatsMode = "tokens" | "tokensPerSecond";

/** Display options shared by the terminal UI runner and renderer. */
export type TuiDisplayOptions = DevelopmentTuiDisplayOptions;
