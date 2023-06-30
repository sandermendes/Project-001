import React from 'react';

export interface IListItemLinkProps {
  to: string;
  primary: React.ReactNode;
  icon: React.ReactNode;
}

export interface ISideMenuProps {
  opened: boolean;
  smallDown: boolean;
}
