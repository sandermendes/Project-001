import React from 'react';
import PageHeader from '../../components/PageHeader';
import { TranslatedString /*, translatedString */ } from '../../shared/providers/translate';
import { APP_TITLE } from '../../shared/constants/title';
import CardListField from '../../components/UserInfo/CardListField';
import { IUserInfos, Type } from '../../components/UserInfo/CardListField/@types';

const nameSpace = ['translation', 'UserInfo', 'common', 'gender'];

export const userInfos: IUserInfos = [
  {
    title: <TranslatedString nameSpace={nameSpace} message="UserInfo.title" />,
    info: (
      <>
        <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1" appTitle={APP_TITLE} />{' '}
        <a
          href="https://support.localhost/accounts/answer/6304920?hl=pt-BR"
          /* aria-label={translatedString(nameSpace, 'UserInfo.subInfo1AriaLabel', APP_TITLE)} */
        >
          <TranslatedString nameSpace={nameSpace} message="common.learnMore" />
        </a>
      </>
    ),
    fieldItems: [
      {
        name: 'profilePic',
        properties: {
          field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1ProfilePic" />,
          type: Type.Picture,
          value: '[Object]',
        },
      },
      {
        name: 'firstName',
        properties: {
          field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1FirstName" />,
          type: Type.Text,
          value: '',
          info: '',
        },
      },
      {
        name: 'lastName',
        properties: {
          field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1LastName" />,
          type: Type.Text,
          value: '',
          info: '',
        },
      },
      {
        name: 'nickName',
        properties: { field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1Nick" />, type: Type.Text, value: '' },
      },
      {
        name: 'birthDate',
        properties: { field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1BirthDate" />, type: Type.Date, value: '' },
      },
      {
        name: 'gender',
        properties: { field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo1Gender" />, type: Type.Gender, value: '' },
      },
    ],
  },
  {
    title: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo2" />,
    info: '',
    fieldItems: [
      {
        name: 'email',
        properties: { field: <TranslatedString nameSpace={nameSpace} message="UserInfo.subInfo2Email" />, type: Type.Text, value: '' },
      },
    ],
  },
];

function UserInfo() {
  const nameSpace = ['translation', 'UserInfo', 'common'];

  return (
    <>
      <PageHeader
        mainTag
        alignInfoCenter
        title={<TranslatedString nameSpace={nameSpace} message="UserInfo.title" />}
        info={<TranslatedString nameSpace={nameSpace} message="UserInfo.info" appTitle={APP_TITLE} />}
      >
        {userInfos.map((userInfo, index) => (
          <CardListField key={index} title={userInfo.title} info={userInfo.info} fieldItems={userInfo.fieldItems} />
        ))}
      </PageHeader>
    </>
  );
}

export default UserInfo;
