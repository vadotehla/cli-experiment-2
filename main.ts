/** @format */

import { argv as args, argv0 } from "node:process";

import * as Types from "./assets/types.ts";

const CLIData: Types.EngineData = {
  CLIName: "dkpm",
  CLIVersion: "v1.0.0-beta",
};

const argv = args.slice(3);

