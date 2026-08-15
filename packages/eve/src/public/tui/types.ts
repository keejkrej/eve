/** Values supported by development TUI select prompts. */
export type DevelopmentTuiPromptValue = string | number | boolean;

/** One option in a development TUI select prompt. */
export interface DevelopmentTuiSelectOption<T extends DevelopmentTuiPromptValue> {
  readonly value: T;
  readonly label: string;
  readonly hint?: string;
  readonly description?: string;
}

interface DevelopmentTuiSelectCommonOptions<T extends DevelopmentTuiPromptValue> {
  readonly message: string;
  readonly options: DevelopmentTuiSelectOption<T>[];
  readonly search?: boolean;
  readonly placeholder?: string;
}

/** Options for a single-value development TUI select prompt. */
export interface DevelopmentTuiSingleSelectOptions<
  T extends DevelopmentTuiPromptValue,
> extends DevelopmentTuiSelectCommonOptions<T> {
  readonly multiple?: false;
  readonly initialValue?: T;
}

/** Options for a multiple-value development TUI select prompt. */
export interface DevelopmentTuiMultiSelectOptions<
  T extends DevelopmentTuiPromptValue,
> extends DevelopmentTuiSelectCommonOptions<T> {
  readonly multiple: true;
  readonly initialValues?: T[];
  readonly required?: boolean;
}

/** TUI-native model picker available while a custom `/model` flow is active. */
export interface DevelopmentTuiPrompter {
  select<T extends DevelopmentTuiPromptValue>(
    options: DevelopmentTuiSingleSelectOptions<T>,
  ): Promise<T>;
  select<T extends DevelopmentTuiPromptValue>(
    options: DevelopmentTuiMultiSelectOptions<T>,
  ): Promise<T[]>;
}

export interface DevelopmentTuiModelCommandInput {
  /** The local eve application whose model the command configures. */
  readonly appRoot: string;
  /** The local development server whose model status the TUI refreshes. */
  readonly serverUrl: string;
  /** Text after `/model`, or an empty string for the interactive command. */
  readonly argument: string;
  /** TUI-native select prompts rendered inside the active setup panel. */
  readonly prompter: DevelopmentTuiPrompter;
}

/** A product-supplied `/model` flow for an embedded development TUI. */
export type DevelopmentTuiModelCommand = (
  input: DevelopmentTuiModelCommandInput,
) => Promise<string>;

/** Local or remote server backing one embedded development TUI session. */
export type DevelopmentTuiTarget =
  | {
      readonly kind: "local";
      readonly serverUrl: string;
      readonly workspaceRoot: string;
    }
  | {
      readonly kind: "remote";
      readonly serverUrl: string;
      readonly workspaceRoot: string;
    };

/** Presentation controls for an embedded development TUI. */
export interface DevelopmentTuiDisplayOptions {
  name?: string;
  /** Pass an empty array to omit the local header tip. */
  headerTips?: readonly string[];
  /** Presentation-only aliases for external model provider identifiers. */
  externalProviderDisplayNames?: Readonly<Record<string, string>>;
  /** Defaults to true; model-provider setup issues remain independent. */
  showVercelAuthSetupIssues?: boolean;
  tools?: "full" | "collapsed" | "auto-collapsed" | "hidden";
  reasoning?: "full" | "collapsed" | "auto-collapsed" | "hidden";
  subagents?: "full" | "collapsed" | "auto-collapsed" | "hidden";
  connectionAuth?: "full" | "collapsed" | "auto-collapsed" | "hidden";
  assistantResponseStats?: "tokens" | "tokensPerSecond";
  contextSize?: number;
  logs?: "all" | "stderr" | "sandbox" | "none";
}

/** Input for {@link runDevelopmentTui}. The embedding process owns the server lifecycle. */
export interface RunDevelopmentTuiInput extends DevelopmentTuiDisplayOptions {
  readonly target: DevelopmentTuiTarget;
  readonly headers?: Readonly<Record<string, string>>;
  readonly initialInput?: string;
  readonly modelCommand?: DevelopmentTuiModelCommand;
}
