/** @format */

import { argv as args, argv0 } from "node:process";

import * as Types from "./assets/types.ts";

const CLIData: Types.EngineData = {
  CLIName: "dkpm",
  CLIVersion: "v1.0.0-beta",
};

const argv = args.slice(3);
const Commands = new Map<string, string>();
const Flags = new Map<string, Types.FlagInPlay>();
const Arguments = new Map<number, string>();

let x = 0;
let TerminateFlags = false;
while (x < argv.length) {
  const CurrentItem = argv[x].trim();
  if (CurrentItem.startsWith("-")) {
    if (CurrentItem === "--") {
      TerminateFlags = true;
    } else if (CurrentItem !== "--" && !TerminateFlags) {
      const flag: Types.FlagInPlay = {
        FlagName: CurrentItem.slice(
          CurrentItem.startsWith("--") ? 2 : 1,
          !CurrentItem.includes("=")
            ? CurrentItem.length
            : CurrentItem.indexOf("=")
        ),
        FlagValue: null,
      };
      if (CurrentItem.includes("=")) {
        const value = CurrentItem.slice(CurrentItem.indexOf("=") + 1);
        flag.FlagValue = value;
      } else {
        const y = x + 1;
        const value = argv[y];
        if (value) {
          if (value.startsWith("-")) {
            flag.FlagValue = true;
          } else {
            flag.FlagValue = value;
          }
        } else flag.FlagValue = true;
      }
      Flags.set(flag.FlagName, flag);
    }
  }
  x++;
}

console.log(Flags);
