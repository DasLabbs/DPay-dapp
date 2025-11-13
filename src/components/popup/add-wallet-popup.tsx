import { Drawer, DrawerContent } from '../shared/drawer';

const AddWalletPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose} container={document.getElementById('container')}>
      <DrawerContent className="absolute w-full bg-white"></DrawerContent>
    </Drawer>
  );
};

export default AddWalletPopup;
