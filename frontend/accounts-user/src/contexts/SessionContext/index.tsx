import React, { createContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { PROFILE } from '../../graphql/User';
import Loading from '../../components/Loading';
import { ISessionContextProviderProps, ProfileContext, ProfileData } from './@types';
import { ICheckAuthData } from '../../components/Template/Base/@types';
import { CHECK_AUTH } from '../../components/Template/Base/graphql/check.graphql';
import { redirectToAccountSign } from '../../shared/utils/url';

export const SessionContext = createContext({} as ProfileContext);

function SessionContextProvider(props: ISessionContextProviderProps) {
  const [showScreen, setShowScreen] = useState(false);
  const { loading: loadingQueryCheckAuth, data: dataQueryCheckAuth } = useQuery<ICheckAuthData>(CHECK_AUTH);

  const { loading } = useQuery<{ profile?: ProfileData }>(PROFILE, {
    onCompleted: (data) => {
      if (data && data.profile) setProfile(data.profile);
    },
  });

  const [profile, setProfile] = useState({} as ProfileData);

  useEffect(() => {
    if (!loadingQueryCheckAuth) {
      if (dataQueryCheckAuth?.isAuthed) {
        setTimeout(() => {
          setShowScreen(true);
        }, 2000);
      } else {
        redirectToAccountSign();
      }
    }
  }, [loadingQueryCheckAuth, dataQueryCheckAuth]);

  return showScreen && !loading ? <SessionContext.Provider value={{ profile, setProfile }}>{props.children}</SessionContext.Provider> : <Loading />;
}

export default SessionContextProvider;
