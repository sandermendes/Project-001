import React from 'react';
import PageHeader from '../../PageHeader';
import { IUserInfo } from './@types';
import FieldsList from '../FieldsList';
import * as S from './styles';

type ICardListFieldProps = IUserInfo;

function CardListField(props: ICardListFieldProps) {
  const { title, info, fieldItems } = props;

  return (
    <S.RootPaper variant="outlined">
      <PageHeader title={title} info={info} />
      <FieldsList fieldItems={fieldItems} />
    </S.RootPaper>
  );
}

export default CardListField;
