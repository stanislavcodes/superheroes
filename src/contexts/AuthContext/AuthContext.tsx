import { AuthError, Session } from '@supabase/supabase-js';
import { FC, createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '~/utils/supabaseCilent';

type AuthContextProps = {
  session: Session | null;
  error: AuthError | null;
  isSignedIn: boolean;
  logOut: () => void;
};

const initialState = {
  session: null,
  error: null,
  isSignedIn: false,
  logOut: () => {
    console.log('logOut');
  },
};

const AuthContext = createContext<AuthContextProps>(initialState);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const [sessionError, setSessionError] = useState<AuthError | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSessionData(data.session);
      setSessionError(error);
    };

    getSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSessionData(session);
      setSessionError(null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session: sessionData,
        error: sessionError,
        isSignedIn: !!sessionData && !sessionError,
        logOut: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error('useAuthContext must be used inside a AuthContextProvider');
  }

  return authContext;
};
