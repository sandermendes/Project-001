import React, { useContext } from 'react';
import { Divider, Grid, List, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { FieldsListProps, ListItemLinkProps } from './@types';
import * as S from './styles';
import { SessionContext } from '../../../contexts/SessionContext';
import dayjs from 'dayjs';

function ListItemLink({ field, value, divider, to }: ListItemLinkProps) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const CustomLink = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((linkProps, ref) => (
    <RouterLink ref={ref} to={to as string} {...linkProps} />
  ));

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const convertValue = (type: string, value: any) => {
    if (type === 'birthDate') return dayjs(value).format('DD/MM/YYYY');
    return value;
  };

  return (
    <>
      <S.ListItemRoot disablePadding>
        <S.ListItemButtonRoot component={CustomLink}>
          <Grid container>
            <Grid item xs={4} md={3}>
              <ListItemIcon>{field}</ListItemIcon>
            </Grid>
            <Grid item xs={8} md={9}>
              <ListItemText primary={convertValue(to as string, value)} />
              <ListItemSecondaryAction>
                <ChevronRightIcon />
              </ListItemSecondaryAction>
            </Grid>
          </Grid>
        </S.ListItemButtonRoot>
      </S.ListItemRoot>
      {divider ? <Divider /> : ''}
    </>
  );
}

function FieldsList({ fieldItems }: FieldsListProps) {
  const { profile } = useContext(SessionContext);
  console.log("FieldsList - profile", profile)

  return (
    <Grid item>
      <List>
        {fieldItems.map((field, index) => (
          <ListItemLink
            key={index}
            to={field.name}
            field={field.properties.field}
            value={field.name in profile ? profile[field.name] : ''}
            divider={fieldItems.length - 1 > index}
          />
        ))}
      </List>
    </Grid>
  );
}

export default FieldsList;
