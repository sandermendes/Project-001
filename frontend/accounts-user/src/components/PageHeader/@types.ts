import React from 'react';

export interface IPageHeaderProps {
  title: React.ReactNode;
  info: React.ReactNode;
  mainTag?: boolean;
  alignInfoCenter?: boolean;
  children?: React.ReactNode;
}
