/** @format */
// deno-lint-ignore-file no-explicit-any

export type EngineData = {
  CLIName: Readonly<string>;
  CLIVersion:
    | Readonly<`v${number}.${number}.${number}`>
    | Readonly<`v${number}.${number}.${number}-beta`>;
};

export interface Flag {
  readonly FlagName: string;
  readonly FlagDescription: string[] | null;
  readonly FlagBooleanValue: boolean;
  readonly FlagExpectedType: string;
  readonly FlagValue: any;
}
export interface Command {
  readonly CommandName: string;
  readonly CommandDescription: string[] | null;
  readonly CommandShortDescription: string[] | null;
  readonly CommandExpectedFlags: Set<Flag> | null;
  readonly CommandExpectedSubcommands: Set<Command> | null;
}
export interface FlagInPlay {
  FlagName: string;
  FlagValue: any;
}
