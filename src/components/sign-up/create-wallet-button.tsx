import { usePrivy } from '@privy-io/react-auth';

import SecondaryButton from '../shared/secondary-button';

const CreateWalletButton = () => {
  const { connectOrCreateWallet } = usePrivy();

  return <SecondaryButton onClick={connectOrCreateWallet}>Create new wallet</SecondaryButton>;
};

export default CreateWalletButton;
