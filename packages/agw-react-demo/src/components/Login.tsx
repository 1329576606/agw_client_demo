import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { useAccount } from "wagmi";

export function Login() {
  const { status } = useAccount();
  const { login, logout } = useLoginWithAbstract();
  const isConnected = status === "connected";

  return (
    <>
      {!isConnected ? (
        <button onClick={login} className="login-button">
          Connect
        </button>
      ) : (
        <button onClick={logout} className="login-button">
          Disconnect
        </button>
      )}
    </>
  );
}
