import React, { useContext } from 'react';
import PageHeader from '../../components/PageHeader';
import { translatedString, TranslatedString } from '../../shared/providers/translate';
import { APP_TITLE } from '../../shared/constants/title';
import * as S from './styles';
import { SessionContext } from '../../contexts/SessionContext';

const InfoHeader = ({ nameSpace }: { nameSpace: string[] }) => {
  return (
    <>
      <TranslatedString nameSpace={nameSpace} message="Home.info" appTitle={APP_TITLE} />{' '}
      <a
        href="https://localhost/account/about/?hl=pt-BR&amp;utm_source=vitanexus-account&amp;utm_medium=web\"
        aria-label={translatedString(nameSpace, 'Home.infoLink', APP_TITLE)}
      >
        <TranslatedString nameSpace={nameSpace} message="common.learnMore" />
      </a>
    </>
  );
};

function Home() {
  const nameSpace = ['translation', 'Home', 'common'];

  const { profile } = useContext(SessionContext);

  return (
    <>
      <PageHeader
        mainTag
        alignInfoCenter
        title={<TranslatedString nameSpace={nameSpace} message="Home.title" firstName={profile.firstName} lastName={profile.lastName} />}
        info={<InfoHeader nameSpace={nameSpace} />}
      >
        <S.HeaderAvatar>
          <S.AvatarRoot />
        </S.HeaderAvatar>
      </PageHeader>
    </>
  );
}

export default Home;
