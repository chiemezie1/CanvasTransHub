import type { Address } from "viem";
import { canvasTransAbi } from "./generated";

const deployedAddress = process.env
	.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS as Address;

// Type inference correctly
const ABI = canvasTransAbi;
export { ABI, deployedAddress };
