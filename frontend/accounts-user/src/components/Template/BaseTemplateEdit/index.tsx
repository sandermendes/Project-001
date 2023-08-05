import Base from '../Base';
import { ThemeProvider } from '@mui/material';
import { themeEdit } from '../../../theme';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import BarProminent from './BarProminent';
import { userInfos } from '../../../pages/UserInfo';
import Content from './Content';
import * as S from './styles';
import { IBaseTemplateEditProps } from './@types';

const EditContent = () => {
  const { screen } = useParams();

  const contentType = userInfos
    .filter((element) => element.fieldItems.some((fieldItem) => fieldItem.name === screen))
    .map((element) => element.fieldItems.filter((fieldItem) => fieldItem.name === screen)[0])[0];

  if (!contentType) return <Navigate replace to="/u/user-info" />;

  return (
    <>
      <BarProminent title={contentType.properties.field} />
      <Content field={contentType} />
    </>
  );
};

function BaseTemplateEdit(props: IBaseTemplateEditProps) {
  return (
    <Base {...props}>
      <S.DivRoot>
        <ThemeProvider theme={themeEdit}>
          <Routes>
            <Route path=":screen/*" element={<EditContent />} />
          </Routes>
        </ThemeProvider>
      </S.DivRoot>
    </Base>
  );
}

export default BaseTemplateEdit;
