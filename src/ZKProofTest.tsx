// src/ZKProofTest.js
import { useState, useEffect } from "react";
import init, { generate_zkp_proof_only } from "./pkg-web/zkp_rust_client";

function ZKProofTest() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(100);
  const [increments, setIncrements] = useState(120);

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

      setResult({
        success: proofResult.success,
        generationTime: proofResult.generation_time_ms,
        proofSize: proofResult.proof_size_bytes,
        start: Number(proofResult.public_input_start),
        result: Number(proofResult.public_input_result),
        error: proofResult.error_message,
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
        <div
          style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}
        >
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          <p>See console log for more details</p>
        </div>
      )}
    </div>
  );
}

export default ZKProofTest;
