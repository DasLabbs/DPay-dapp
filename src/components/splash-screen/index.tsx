import dpayLogo from '@assets/dpay-logo.svg';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      className="splash-screen-bg flex h-full w-full items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.img
        src={dpayLogo}
        alt="DPay Logo"
        className="h-auto w-[176px] object-cover"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.9, 0.26, 1] }}
      />
    </motion.div>
  );
};

export default SplashScreen;
