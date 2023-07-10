import React, { useContext, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { ICardEditFieldsProps } from './@types';
import Field from '../Field';
import * as S from './styles';
import { SessionContext } from '../../contexts/SessionContext';
import { useMutation } from '@apollo/client';
import { PROFILE /*, PROFILE_UPDATE */ } from '../../graphql/User';
import { useNavigate } from 'react-router-dom';
import { IProfileUpdate } from '../../@types/profile';
import { TranslatedString } from '../../../src/shared/providers/translate';

function CardEditFields({ field }: ICardEditFieldsProps) {
  const nameSpace = ['translation', 'common'];

  const navigate = useNavigate();
  const { profile, setProfile } = useContext(SessionContext);
  const [value, setValue] = useState(profile[field.name]);
  const [loading, setLoading] = useState(false);

  // const [profileUpdate] = useMutation<string, IProfileUpdate>(PROFILE_UPDATE, {
  //   refetchQueries: [{ query: PROFILE, returnPartialData: true }],
  //   awaitRefetchQueries: true,
  //   // update() {
  //   //   setTimeout(() => {
  //   //     setProfile({ ...profile, [field.name]: value });
  //   //     navigate('/u/user-info');
  //   //   }, 2000);
  //   // },
  //   onCompleted() {
  //     setTimeout(() => {
  //       setProfile({ ...profile, [field.name]: value });
  //       navigate('/u/user-info');
  //     }, 2000);
  //   },
  // });

  const handleInputChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = element.target;
    setValue(value);
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    // event.preventDefault();
    // setLoading(true);
    // await profileUpdate({
    //   variables: { [field.name]: value },
    // });
  };

  return (
    <Container maxWidth="md">
      {field.properties.info ? <Typography variant="subtitle1" style={{ marginTop: 25, color: '#5f6368' }}></Typography> : ''}
      <S.PaperRoot variant="outlined">
        <form onSubmit={onSubmit}>
          <Typography variant="h6" noWrap color="primary">
          {<TranslatedString message="common.changeField" />} {field.properties.field}
          </Typography>
          <Field {...field} value={value} onChange={handleInputChange} />
          <Grid container direction="row" justifyContent="flex-end">
            <Button color="primary" onClick={() => navigate('/u/user-info')}>
              {<TranslatedString message="common.cancel" />}
            </Button>
            <Button color="primary" type="submit" variant="contained" disableElevation disabled={loading} style={{ marginLeft: 20 }}>
              {<TranslatedString message="common.save" />}
            </Button>
            <Button></Button>
          </Grid>
        </form>
      </S.PaperRoot>
    </Container>
  );
}

export default CardEditFields;
