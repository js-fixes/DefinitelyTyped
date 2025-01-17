// Type definitions for ndjson 2.0
// Project: https://github.com/maxogden/ndjson
// Definitions by: Junxiao Shi <https://github.com/yoursunny>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import { DuplexOptions, Transform } from "stream";
import { ThroughStream } from "through";

export interface ParseOptions {
    strict?: boolean | undefined;
}

export function parse(opts?: ParseOptions): ThroughStream;

export function stringify(opts?: DuplexOptions): Transform;
