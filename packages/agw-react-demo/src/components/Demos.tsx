import {useAbstractClient} from "@abstract-foundation/agw-react";
import {useAccount} from "wagmi";
import {AbstractClient} from "@abstract-foundation/agw-client";
import {createPublicClient, encodeFunctionData, Hex} from "viem";
import {http} from "viem";
import {abstractTestnet} from "viem/chains";

export function Demos() {
    const {status} = useAccount();
    const client: AbstractClient = useAbstractClient().data!;
    const provider = createPublicClient({
        chain:abstractTestnet,
        transport:http()
    })
    const isConnected = status === "connected";

    async function signMsg() {
        console.log("signMsg");
        const res = await client.signMessage({message: "hello world"});
        console.log(res);
        await client.sendTransaction({
            to: '0xE1EED60a089BBe1495e45a7B14D8aA7f91C5557d',
            value: 1n,
            gasPrice: 1000000n
        })
    }

    async function sendBatchTx() {

        const calls: Array<{ target: Hex, allowFailure: boolean, value: bigint, callData: Hex }> = [{
            target: '0xE1EED60a089BBe1495e45a7B14D8aA7f91C5557d',
            allowFailure: false,
            value: 1n,
            callData: "0x"
        }, {
            target: '0x490Dd3cCc7ff94823d4F10bb6d97c7802957e6bf',
            allowFailure: false,
            value: 2n,
            callData: "0x"
        }];
        // await client.sendTransactionBatch({calls:calls})
        const batchCallData = encodeFunctionData({
            abi: [
                {
                    name: 'batchCall',
                    type: 'function',
                    inputs: [
                        {
                            type: 'tuple[]',
                            name: 'calls',
                            components: [
                                {name: 'target', type: 'address'},
                                {name: 'allowFailure', type: 'bool'},
                                {name: 'value', type: 'uint256'},
                                {name: 'callData', type: 'bytes'},
                            ],
                        },
                    ],
                    outputs: [],
                },
            ],
            args: [calls],
        });
        const tx = await client.prepareAbstractTransactionRequest({
            to: client.account.address,
            data: batchCallData,
            value: calls.reduce((a, b) => a + b.value, 0n),
            chain: client.chain,
        });
        delete tx["chain"];
        // if (tx.maxFeePerGas && !tx.maxPriorityFeePerGas) tx.maxPriorityFeePerGas = tx.maxFeePerGas;
        console.log(tx)
        const hash = await client.sendTransaction(tx);
        console.log(`transactionHash: ${hash}`);
        const receipt = await provider.getTransactionReceipt({hash});
        console.log(receipt);
    }

    return (
        <>
            {!isConnected ? <></> : (
                <>
                    <button onClick={signMsg} className="button">
                        signMsg
                    </button>
                    <button onClick={sendBatchTx} className="button">
                        sendBatchTx
                    </button>
                </>
            )}
        </>
    );
}
