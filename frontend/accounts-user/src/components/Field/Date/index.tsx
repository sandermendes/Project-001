import { ChangeEvent, useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import dayjs from 'dayjs';

import { FieldList } from '@/components/UserInfo/CardListField/@types';
import { AGE_ACCEPTABLE } from '@/shared/constants/user';

interface IDateProps extends FieldList {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  value: any;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Date({ value }: IDateProps) {
  const birthDate = dayjs(value);
  const currentYear: number = dayjs().year();

  const [day, setDay] = useState(birthDate.date().toString());
  const [month, setMonth] = useState((birthDate.month() + 1).toString());
  const [year, setYear] = useState(birthDate.year().toString());

  const [date, setDate] = useState('');

  const [errorDay, setErrorDay] = useState('');
  const [errorYear, setErrorYear] = useState('');
  const startDate = currentYear - AGE_ACCEPTABLE;

  const onChangeDayHandler = (element: ChangeEvent<HTMLInputElement>) => {
    const { value } = element.target;
    if (+value < 1 || +value > 31) {
      setErrorDay('Dia deve estar entre 1 e 31');
    } else {
      setErrorDay('');
    }
    setDay(value);
  };

  const onChangeMonthHandler = (element: SelectChangeEvent<string>) => {
    const { value } = element.target;
    setMonth(value);
  };

  const onChangeYearHandler = (element: ChangeEvent<HTMLInputElement>) => {
    const { value } = element.target;
    if (value.length === 4 && (+value < startDate || +value > currentYear)) {
      setErrorYear(`Ano deve estar entre ${startDate} a ${currentYear}`);
    } else {
      setErrorYear('');
    }
    setYear(value);
  };

  useEffect(() => {
    const finalDate = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
    setDate(finalDate);
  }, [day, month, year]);

  useEffect(() => {
    console.log('useEffect - date', date);
  }, [date]);

  return (
    <>
      <Grid container spacing={4} style={{ maxWidth: '500px' }}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Day"
            name="day"
            variant="outlined"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', type: 'text', min: 1, max: 31, maxLength: 2 }}
            value={day}
            onChange={onChangeDayHandler}
            onBlur={(element) => {
              const { value } = element.target;
              setDay((+value).toString());
            }}
            style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
            error={errorDay !== ''}
            helperText={errorDay}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
            <InputLabel id="select-month-label">Month</InputLabel>
            <Select labelId="select-month-label" label="Month" value={month} onChange={onChangeMonthHandler}>
              <MenuItem value={0}>Month</MenuItem>
              {MONTHS.map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Year"
            name="year"
            variant="outlined"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', type: 'text', min: startDate, max: currentYear, maxLength: 4 }}
            value={year}
            onChange={onChangeYearHandler}
            onBlur={(element) => {
              const { value } = element.target;
              if (value.length < 4) setErrorYear('Ano deve conter 4 dígitos');
            }}
            style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
            error={errorYear !== ''}
            helperText={errorYear}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Date;
