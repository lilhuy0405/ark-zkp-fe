/* tslint:disable */
/* eslint-disable */
export function main(): void;
export function generate_zkp_proof_only(start: bigint, increments: bigint): WasmProofGeneration;
export function verify_zkp_proof_only(proof_data: Uint8Array, start: bigint, result: bigint): WasmProofVerification;
export function verify_computation(start: bigint, increments: bigint, expected_result: bigint): boolean;
export function run_generation_benchmark(num_proofs: number): WasmBenchmarkResult;
export function get_library_info(): any;
export class WasmBenchmarkResult {
  private constructor();
  free(): void;
  readonly total_proofs: number;
  readonly successful_proofs: number;
  readonly total_time_ms: number;
  readonly average_proof_time_ms: number;
  readonly average_verification_time_ms: number;
  readonly proofs_per_second: number;
  readonly success_rate: number;
}
export class WasmProofGeneration {
  private constructor();
  free(): void;
  to_json(): string;
  readonly success: boolean;
  readonly generation_time_ms: number;
  readonly proof_data: Uint8Array;
  readonly public_input_start: bigint;
  readonly public_input_result: bigint;
  readonly error_message: string | undefined;
  readonly proof_size_bytes: number;
}
export class WasmProofVerification {
  private constructor();
  free(): void;
  to_json(): string;
  readonly is_valid: boolean;
  readonly verification_time_ms: number;
  readonly error_message: string | undefined;
}
export class WasmZKProver {
  free(): void;
  constructor();
  generate_proof_only(start: bigint, increments: bigint): WasmProofGeneration;
  verify_proof_only(_proof_data: Uint8Array, start: bigint, result: bigint): WasmProofVerification;
  get_setup_time_ms(): number;
  benchmark_generation_only(num_proofs: number): WasmBenchmarkResult;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_wasmproofgeneration_free: (a: number, b: number) => void;
  readonly wasmproofgeneration_success: (a: number) => number;
  readonly wasmproofgeneration_proof_data: (a: number) => [number, number];
  readonly wasmproofgeneration_public_input_start: (a: number) => bigint;
  readonly wasmproofgeneration_public_input_result: (a: number) => bigint;
  readonly wasmproofgeneration_error_message: (a: number) => [number, number];
  readonly wasmproofgeneration_proof_size_bytes: (a: number) => number;
  readonly wasmproofgeneration_to_json: (a: number) => [number, number];
  readonly __wbg_wasmproofverification_free: (a: number, b: number) => void;
  readonly wasmproofverification_is_valid: (a: number) => number;
  readonly wasmproofverification_error_message: (a: number) => [number, number];
  readonly wasmproofverification_to_json: (a: number) => [number, number];
  readonly __wbg_wasmbenchmarkresult_free: (a: number, b: number) => void;
  readonly wasmbenchmarkresult_total_proofs: (a: number) => number;
  readonly wasmbenchmarkresult_successful_proofs: (a: number) => number;
  readonly wasmbenchmarkresult_total_time_ms: (a: number) => number;
  readonly wasmbenchmarkresult_average_proof_time_ms: (a: number) => number;
  readonly wasmbenchmarkresult_average_verification_time_ms: (a: number) => number;
  readonly wasmbenchmarkresult_proofs_per_second: (a: number) => number;
  readonly wasmbenchmarkresult_success_rate: (a: number) => number;
  readonly __wbg_wasmzkprover_free: (a: number, b: number) => void;
  readonly wasmzkprover_new: () => [number, number, number];
  readonly wasmzkprover_generate_proof_only: (a: number, b: bigint, c: bigint) => [number, number, number];
  readonly wasmzkprover_verify_proof_only: (a: number, b: number, c: number, d: bigint, e: bigint) => [number, number, number];
  readonly wasmzkprover_get_setup_time_ms: (a: number) => number;
  readonly wasmzkprover_benchmark_generation_only: (a: number, b: number) => [number, number, number];
  readonly generate_zkp_proof_only: (a: bigint, b: bigint) => [number, number, number];
  readonly verify_zkp_proof_only: (a: number, b: number, c: bigint, d: bigint) => [number, number, number];
  readonly verify_computation: (a: bigint, b: bigint, c: bigint) => number;
  readonly run_generation_benchmark: (a: number) => [number, number, number];
  readonly get_library_info: () => any;
  readonly main: () => void;
  readonly wasmproofverification_verification_time_ms: (a: number) => number;
  readonly wasmproofgeneration_generation_time_ms: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
