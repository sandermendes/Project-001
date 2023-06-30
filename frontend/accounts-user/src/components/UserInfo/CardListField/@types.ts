import React from 'react';

// export type Fields = 'profilePic' | 'firstName' | 'lastName' | 'nickName' | 'birthDate' | 'gender' | 'email' | 'username';
export type Fields = 'profilePic' | 'firstName' | 'lastName' | 'email' | 'nickName' | 'birthDate' | 'gender';

export enum Type {
  Text,
  Date,
  Gender,
  Picture,
}

export interface IFieldProperties {
  field: React.ReactNode;
  type: Type;
  value: string | number | Date | null;
  default?: string;
  info?: string;
}

export interface FieldList {
  name: Fields;
  properties: IFieldProperties;
}

export interface IUserInfo {
  title: React.ReactNode;
  info: React.ReactNode;
  fieldItems: FieldList[];
}

export type IUserInfos = IUserInfo[];
