import React from 'react';

export interface ProfileData {
  // id: string;
  // realName: string;
  firstName: string;
  lastName: string;

  nickName: string;
  profilePic: string;

  // cpf: string;

  birthDate: Date;
  gender: number;
  email: string;
  // username: string;
}

export type ProfileContext = {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
};

export interface ISessionContextProviderProps {
  children?: React.ReactNode;
}
