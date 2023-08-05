import { Grid, ThemeProvider } from '@mui/material';
import CardEditFields from '../../../CardEditFields';
import { themeEditContent } from '../../../../theme';
import * as S from './styles';
import { IContentProps } from './@types';

function Content({ field }: IContentProps) {
  return (
    <ThemeProvider theme={themeEditContent}>
      <Grid container justifyContent="center">
        <S.GridContentFields container justifyContent="center">
          <CardEditFields field={field} />
        </S.GridContentFields>
      </Grid>
    </ThemeProvider>
  );
}

export default Content;
