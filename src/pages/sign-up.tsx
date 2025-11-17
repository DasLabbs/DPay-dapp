import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import walletThumbnail from '@assets/wallet-thumb.png';
import { usePrivy } from '@privy-io/react-auth';
import SecondaryButton from '@src/components/shared/secondary-button';
import LoginButton from '@src/components/sign-up/login-button';
import routes from '@src/routes/routes';

const SignUpPage = () => {
  const { authenticated } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate(routes.HOME);
    }
  }, [authenticated]);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <img src={walletThumbnail} alt="Wallet Thumbnail" className="w-[218px] object-contain" />
        <div className="text-text text-center text-[32px] font-semibold leading-[40px]">
          Pay directly with your Web3 wallet
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6 py-8">
        <LoginButton />
        <SecondaryButton disabled>Create new wallet</SecondaryButton>
        <div className="text-center text-xs leading-[16px] text-[#7A7B83]">
          By continuing, you confirm that you have read and agree to our{' '}
          <span className="text-primary">Terms of Service </span>and{' '}
          <span className="text-primary">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
