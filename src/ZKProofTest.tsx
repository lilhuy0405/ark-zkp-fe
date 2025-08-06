// src/ZKProofTest.js
import { useState, useEffect } from "react";
import init, {
  generate_zkp_proof_only,
  verify_zkp_proof_only,
} from "./pkg-web/zkp_rust_client";
const hexLookup = Array.from({ length: 256 }, (_, i) => 
  i.toString(16).padStart(2, '0')
);

function uint8ArrayToHex(uint8Array: Uint8Array): string {
  return uint8Array.reduce((hex, byte) => hex + hexLookup[byte], '');
}

function hexToUint8Array(hexString: string): Uint8Array {
  const hex = hexString.replace(/^0x/i, '');
  const normalizedHex = hex.length % 2 === 0 ? hex : '0' + hex;
  
  const bytes = new Uint8Array(normalizedHex.length / 2);
  
  for (let i = 0; i < normalizedHex.length; i += 2) {
    bytes[i / 2] = parseInt(normalizedHex.substr(i, 2), 16);
  }
  
  return bytes;
}
function ZKProofTest() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(100);
  const [increments, setIncrements] = useState(120);
  const [verifyResult, setVerifyResult] = useState<any>(null);

  useEffect(() => {
    async function initWasm() {
      try {
        await init();
        setIsInitialized(true);
        console.log("✅ WASM initialized successfully");
      } catch (error) {
        console.error("❌ WASM initialization failed:", error);
      }
    }
    initWasm();
  }, []);

  const generateProof = async () => {
    if (!isInitialized) return;

    setLoading(true);
    try {
      // const start = start;
      // const increments = increments;

      console.log(`Generating proof for ${start} + ${increments}...`);

      // Use the simplified function
      const proofResult = generate_zkp_proof_only(
        BigInt(start),
        BigInt(increments)
      );
      //convert proof_data to hex
      const proofDataHex = uint8ArrayToHex(proofResult.proof_data);

      setResult({
        success: proofResult.success,
        generationTime: proofResult.generation_time_ms,
        proofSize: proofResult.proof_size_bytes,
        start: Number(proofResult.public_input_start),
        result: Number(proofResult.public_input_result),
        error: proofResult.error_message,
        proof_data: '0x' + proofDataHex,
      });

      console.log("🎉 Proof result:", proofResult);
    } catch (error: any) {
      console.error("❌ Proof generation failed:", error);
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  if (!isInitialized) {
    return <div>Loading WASM...</div>;
  }
  const verifyProof = async () => {
    if (!isInitialized) return;
    console.log("🎉 Verifying proof...");
    const proofData = hexToUint8Array(result.proof_data);
    const verifyResult = verify_zkp_proof_only(
      proofData,
      BigInt(result.start),
      BigInt(result.result)
    );
    console.log("🎉 Verify result:", verifyResult);
    setVerifyResult({
      isValid: verifyResult.is_valid,
      verificationTime: verifyResult.verification_time_ms,
      error: verifyResult.error_message,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚀 ZK Proof Test</h2>
      <div>
        <p>
          Use the wasm build from the{" "}
          <a href="https://github.com/lilhuy0405/ark-zkp">ark-zkp</a> repo.
          which use rust with arkworks to generate the proof.
        </p>
      </div>
      <div>
        <input
          type="number"
          value={start}
          onChange={(e) => setStart(+e.target.value)}
        />
        +{" "}
        <input
          type="number"
          value={increments}
          onChange={(e) => setIncrements(+e.target.value)}
        />
        =
        <button
          onClick={generateProof}
          disabled={loading}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {loading ? "Generating..." : "Generate ZK Proof"}
        </button>
      </div>

      {result && (
        <>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f5f5f5",
            }}
          >
            <h3>Result:</h3>
            <pre>
              {JSON.stringify(
                {
                  ...result,
                  proof_data: `0x${result.proof_data.slice(0, 10)}... (${result.proof_data.length} chars)`,
                },
                null,
                2
              )}
            </pre>
            <p>See console log for more details</p>
          </div>
          <button onClick={verifyProof}>Verify Proof</button>
          {verifyResult && (
            <div>
              <h3>Verify Result:</h3>
              <pre>{JSON.stringify(verifyResult, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ZKProofTest;
