import React from 'react';
import { FieldList, Type } from '../UserInfo/CardListField/@types';
import Text from './Text';
import Date from './Date';
import Gender from './Gender';

export interface IFieldProps extends FieldList {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  value: any;
  onChange: (element: React.ChangeEvent<HTMLInputElement>) => void;
}

function Field(props: IFieldProps) {
  const { properties } = props;

  switch (properties.type) {
    case Type.Text:
      return <Text {...props} />;
    case Type.Date:
      return <Date {...props} />;
    case Type.Gender:
      return <Gender /* {...props} */ />;
    default:
      return <p>Not implemented</p>;
  }
}

export default Field;
