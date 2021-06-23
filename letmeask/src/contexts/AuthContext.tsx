import { createContext, ReactNode, useEffect, useState } from "react";

import { firebase, auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType ); // passa como argumento o valor que será recebido no contexto (string, number, array e etc.)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  /*onAuthStateCHanged ele vai ficar ouvindo um evento, se conseguir detectar que um usuário
    já tinha logado anteriormente, a função irá retornar o usuário
  */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { // 
      if (user) {
        const { displayName, photoURL, uid } = user

        if ( !displayName || !photoURL ) {
          throw new Error('Missing information from Google Account.');
        }
        
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {    
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider); // abre o popUp ao invés de redirecionar para a página do Google
    console.log(result);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if ( !displayName || !photoURL ) {
        throw new Error('Missing information from Google Account.');
      }
      
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { props.children } 
    </AuthContext.Provider>
  );
}