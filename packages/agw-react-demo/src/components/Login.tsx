import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { useAccount } from 'wagmi';

export function Login() {
  const { status } = useAccount();
  const { login, logout } = useLoginWithAbstract();
  const isConnected = status === 'connected';

  return (
    <div className="login-container">
      {!isConnected && (
        <button onClick={login} className="login-button">
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <button onClick={logout} className="disconnect-button">
          Disconnect
        </button>
      )}
    </div>
  );
}
