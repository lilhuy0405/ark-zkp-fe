# ZKP Rust Client

A Rust implementation of Zero-Knowledge Proofs (ZKP) using the Groth16 proving system and the Arkworks cryptographic library. This project demonstrates how to create, verify, and benchmark zero-knowledge proofs for simple arithmetic operations.

## 🚀 Features

- **Groth16 Proving System**: Implements the Groth16 zk-SNARK protocol
- **Simple Addition Circuit**: Demonstrates ZKP for basic arithmetic operations
- **Comprehensive Benchmarking**: Performance testing and analysis tools
- **Memory Usage Analysis**: Proof size and memory consumption metrics
- **Stress Testing**: Rapid-fire proof generation and verification
- **Modular Architecture**: Clean separation of concerns with library and binary components

## 📋 Prerequisites

- Rust 1.70+ (stable channel)
- Cargo package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zkp-rust-client
```

2. Build the project:

```bash
cargo build --release
```

## 🎯 Usage

### Basic Example

Run the main demo to see a simple ZKP in action:

```bash
cargo run --bin main --release
```

This will:

- Set up the Groth16 proving system
- Generate a proof for `42 + 13 = 55`
- Verify the proof without revealing the secret increment value
- Display proof size and timing information

### Benchmarking

Run comprehensive benchmarks to test performance:

```bash
cargo run --release --bin benchmark
```

### Testing

```bash
cargo test --release
```

The benchmark suite includes:

- **Basic Benchmark**: Single proof generation and verification
- **Scale Benchmark**: Multiple proofs with timing analysis
- **Complexity Benchmark**: Different input sizes and complexity levels
- **Stress Test**: Rapid-fire proof generation
- **Memory Benchmark**: Proof size and memory usage analysis

### Library Usage

Use the library in your own projects:

```rust
use zkp_rust_client::SimpleAddProver;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize the prover
    let prover = SimpleAddProver::new()?;
    
    // Generate a proof
    let proof_result = prover.generate_proof(10, 5)?;
    
    // Verify the proof
    let verification_result = prover.verify_proof(
        &proof_result.proof, 
        &proof_result.public_inputs
    )?;
    
    if verification_result.is_valid {
        println!("Proof is valid!");
    }
    
    Ok(())
}
```

## 🏗️ Architecture

### Core Components

- **`AdditionCircuit`**: R1CS constraint system for addition operations
- **`SimpleAddProver`**: Main prover struct with setup, proof generation, and verification
- **`ProofResult`**: Contains proof, public inputs, and timing information
- **`VerificationResult`**: Contains validity status and verification timing
- **`ProofStats`**: Statistical analysis for benchmarking

### Circuit Design

The addition circuit implements the constraint:

```
start + increments = result
```

Where:

- **Public inputs**: `start` and `result`
- **Private witness**: `increments`
- **Zero-knowledge property**: The verifier learns the computation was correct without learning the secret `increments` value

## 📊 Performance

Typical performance metrics (on modern hardware):

- **Setup time**: ~2-5 seconds (one-time trusted setup)
- **Proof generation**: ~50-200ms per proof
- **Proof verification**: ~1-10ms per proof
- **Proof size**: ~200-300 bytes
- **Memory usage**: ~1-2MB per proof

## 🧪 Testing

Run the test suite:

```bash
cargo test
```

Tests include:

- Basic proof generation and verification
- Edge cases (zero increments, large numbers)
- Performance regression tests

## 📁 Project Structure

```
zkp-rust-client/
├── src/
│   ├── lib.rs          # Core library implementation
│   ├── main.rs          # Demo binary
│   ├── benchmark.rs     # Benchmarking suite
│   └── main_backup.rs   # Backup of original implementation
├── Cargo.toml          # Project dependencies
├── Cargo.lock          # Dependency lock file
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🔧 Dependencies

- **ark-bls12-381**: BLS12-381 elliptic curve implementation
- **ark-groth16**: Groth16 zk-SNARK implementation
- **ark-relations**: R1CS constraint system
- **ark-snark**: SNARK trait definitions
- **ark-ff**: Finite field arithmetic
- **ark-std**: Standard library extensions
- **rand**: Random number generation

## 🔐 Security Considerations

- **Trusted Setup**: The current implementation uses a circuit-specific trusted setup. In production, you would use a universal trusted setup or a trusted setup ceremony.
- **Cryptographic Assumptions**: Relies on the security of the BLS12-381 curve and Groth16 protocol.
- **Random Number Generation**: Uses cryptographically secure random number generation.
- **Proof Verification**: Always verify proofs before accepting them as valid.

## 🚧 Limitations

- **Simple Circuit**: Currently only implements addition. More complex circuits would require additional development.
- **No Recursion**: Does not support recursive proof composition.
- **Single Curve**: Only supports BLS12-381. Other curves would require modifications.
- **No Optimizations**: Basic implementation without advanced optimizations like batch verification.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Arkworks](https://github.com/arkworks-rs) for the excellent cryptographic library
- The ZKP community for educational resources and examples
- Rust ecosystem for providing excellent tooling and documentation

## 📚 Further Reading

- [Groth16 Paper](https://eprint.iacr.org/2016/260)
- [Arkworks Documentation](https://docs.rs/arkworks)
- [Zero-Knowledge Proofs: A Primer](https://zkproof.org/)
- [Rust Book](https://doc.rust-lang.org/book/)

## 🐛 Troubleshooting

### Common Issues

1. **Compilation Errors**: Ensure you're using Rust 1.70+ and have all dependencies installed
2. **Memory Issues**: Large proofs may require more memory. Try running with `--release` flag
3. **Performance Issues**: Use `--release` for optimal performance
4. **Dependency Conflicts**: Try `cargo clean` and `cargo update`

### Getting Help

- Check the [Issues](../../issues) page for known problems
- Create a new issue for bugs or feature requests
- Review the test cases for usage examples

---

**Note**: This is a demonstration project for educational purposes. For production use, additional security audits and optimizations would be required.
