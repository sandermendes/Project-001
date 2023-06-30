import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
// import { FieldList } from '../../UserInfo/CardListField/@types';

// type IGenderProps = FieldList;

function Gender(/*{ name, properties }: IGenderProps*/) {
  return (
    <FormControl style={{ width: '100%', maxWidth: '200px', marginTop: '20px', marginBottom: '20px' }}>
      <FormLabel id="radio-group-gender-label">Gender</FormLabel>
      <RadioGroup aria-labelledby="radio-group-gender-label">
        <FormControlLabel value={1} control={<Radio />} label="Female" />
        <FormControlLabel value={2} control={<Radio />} label="Male" />
        <FormControlLabel value={3} control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}

export default Gender;
