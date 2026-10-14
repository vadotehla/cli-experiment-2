/** @format */

export type EngineData = {
  CLIName: Readonly<string>;
  CLIVersion:
    | Readonly<`v${number}.${number}.${number}`>
    | Readonly<`v${number}.${number}.${number}-beta`>;
};
