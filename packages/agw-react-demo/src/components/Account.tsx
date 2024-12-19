import { useAccount } from 'wagmi';

export function Account() {
  const { address, status } = useAccount();
  const isConnected = status === 'connected';

  if (!isConnected || !address) {
    return null;
  }

  return (
    <div className="account-info">
      <div className="address">
        {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    </div>
  );
}
