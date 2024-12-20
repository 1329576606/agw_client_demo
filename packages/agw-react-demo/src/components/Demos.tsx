import { useGlobalWalletSignerClient } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";

export function Demos() {
  const { status } = useAccount();
  const { data: client } = useGlobalWalletSignerClient();
  const isConnected = status === "connected";

  async function signMsg() {
    console.log("signMsg");
    const res = await client?.signMessage({ message: "hello world" });
    console.log(res);
  }

  return (
    <>
      {!isConnected ? <></> : (
        <button onClick={signMsg} className="login-button">
          signMsg
        </button>
      )}
    </>
  );
}
