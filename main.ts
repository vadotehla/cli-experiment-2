/** @format */

import { randomBytes } from "node:crypto";
import { argv as args, argv0, exit } from "node:process";

import * as Types from "./assets/types.ts";

const CLIData: Types.EngineData = {
  CLIName: "dkpm",
  CLIVersion: "v1.0.0-beta",
};

const argv = args.slice(2);
const Commands: string[] = [];
const Flags = new Map<string, Types.FlagInPlay>();
const Arguments: string[] = [];

let x = 0;
let TerminateFlags = false;
while (x < argv.length) {
  let done = false;
  const CurrentItem = argv[x].trim();
  if (CurrentItem.startsWith("-")) {
    if (CurrentItem === "--") {
      TerminateFlags = true;
      done = true;
    } else if (CurrentItem !== "--" && !TerminateFlags) {
      const FlagName = CurrentItem.slice(
        CurrentItem.startsWith("--") ? 2 : 1,
        !CurrentItem.includes("=")
          ? CurrentItem.length
          : CurrentItem.indexOf("=")
      );
      const flag: Types.FlagInPlay = {
        FlagName,
        FlagValue: null,
      };
      if (CurrentItem.includes("=")) {
        const value = CurrentItem.slice(CurrentItem.indexOf("=") + 1);
        flag.FlagValue = value;
      } else {
        if (!CurrentItem.startsWith("--") && FlagName.length > 1) {
          flag.FlagName = FlagName.at(FlagName.length - 1) ?? "a";
          for (let i = 0; i < FlagName.length - 1; i++) {
            const piece = FlagName.at(i);
            if (piece) {
              Flags.set(randomBytes(8).toString("hex"), {
                FlagName: piece,
                FlagValue: true,
              });
            }
          }
        }
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
      Flags.set(randomBytes(8).toString("hex"), flag);
      done = true;
    }
  }
  if (TerminateFlags && !done) {
    Arguments.push(CurrentItem);
  } else if (!done) {
    Commands.push(CurrentItem);
  }
  x++;
}

const PrimaryCommand = Commands[0] ?? null;
if (
  (PrimaryCommand === "help" || Flags.has("h") || Flags.has("help")) &&
  Commands.length < 2
) {
  console.log(`${argv0} help`);
  console.log(`${CLIData.CLIName} => ${CLIData.CLIVersion}`);

  exit(0);
}
