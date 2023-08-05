import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { TranslatedString } from '@/shared/providers/translate';
// import { FieldList } from '../../UserInfo/CardListField/@types';

// type IGenderProps = FieldList;

function Gender(/*{ name, properties }: IGenderProps*/) {
  return (
    <FormControl style={{ width: '100%', maxWidth: '200px', marginTop: '20px', marginBottom: '20px' }}>
      <FormLabel id="radio-group-gender-label">
        {<TranslatedString message="UserInfo.subInfo1Gender" />}
      </FormLabel>
      <RadioGroup aria-labelledby="radio-group-gender-label">
        <FormControlLabel value={1} control={<Radio />} label={<TranslatedString message="gender.female" />} />
        <FormControlLabel value={2} control={<Radio />} label={<TranslatedString message="gender.male" />} />
        <FormControlLabel value={3} control={<Radio />} label={<TranslatedString message="gender.undefined" />} />
      </RadioGroup>
    </FormControl>
  );
}

export default Gender;
