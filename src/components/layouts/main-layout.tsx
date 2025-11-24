import React from 'react';

import BottomBar from '../bottom-bar';

type Props = {
  children?: React.ReactNode;
};

const MainLayout = (props: Props) => {
  const { children } = props;
  return (
    <div className="relative flex h-full w-full flex-col">
      {children}
      <BottomBar />
    </div>
  );
};

export default MainLayout;
