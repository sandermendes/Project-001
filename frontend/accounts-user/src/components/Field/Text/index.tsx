import { TextField } from '@mui/material';

import { IFieldProps } from '../index';

type ITextProps = IFieldProps;

function Text({ name, properties, value, onChange }: ITextProps) {
  return (
    <TextField
      label={properties.field}
      name={name}
      variant="outlined"
      type="text"
      value={value}
      onChange={onChange}
      style={{ width: '40%', marginTop: '20px', marginBottom: '20px' }}
    />
  );
}

export default Text;
