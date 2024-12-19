import { createAbstractClient } from "@abstract-foundation/agw-client";
import { config } from "dotenv";
import { Hex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { abstractTestnet } from "viem/chains";
config();
const privateKey:Hex = process.env.PRIVATE_KEY as Hex ?? generatePrivateKey(); // Make a random private key
async function main() {
    const account = privateKeyToAccount(privateKey); // Use that to create a signer
    // Create a wallet client where:
    // - Transactions are signed by the provided account in the signer field.
    // - Transactions are sent from the AGW smart contract wallet (i.e. tx.from)
    const agwClient = await createAbstractClient({
        chain: abstractTestnet,
        signer: account, // This is the AGW "owner" (the initial approved signer) of the smart contract wallet.
    });

    await agwClient
}

main().catch(console.error);

