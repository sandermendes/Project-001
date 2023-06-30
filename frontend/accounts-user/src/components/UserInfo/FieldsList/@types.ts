import { FieldList } from '../CardListField/@types';
import React from 'react';
import { ListItemButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface FieldsListProps {
  fieldItems: FieldList[];
}

export interface ListItemLinkProps {
  to: React.ReactNode;
  field: React.ReactNode;
  value: string | number | Date | null;
  divider: boolean;
}

export type ListItemButtonRootProps = ListItemButtonProps & { component: typeof RouterLink };
