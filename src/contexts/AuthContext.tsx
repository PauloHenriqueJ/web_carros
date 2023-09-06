import { ReactNode, createContext, useState, useEffect } from "react";

//firebase
import {onAuthStateChanged} from 'firebase/auth' // verifica se tem usuario no sistema
import { auth } from "../services/firebaseConnection";

interface AuthProviderProps{
    children: ReactNode // aqui é um componente em react que sao as rotas
}

type AuthContexData ={ // aqui é oque vai ser importado
    signed: boolean;
    loadingAuth:boolean;
    handleInfoUser:({uid,name,email}:UserProps) => void;
    user:UserProps | null;
}

interface UserProps{
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext ({} as AuthContexData) // o contexto vai respeita a tipagem

function AuthProvider ({children}: AuthProviderProps){
const [user, setUser] = useState <UserProps | null> (null);
const [loadingAuth,setLoadingAuth] = useState(true);

useEffect (() => {
    const onsub = onAuthStateChanged(auth,(user) => {
        if(user){
            //tem user logado
            setUser({
                uid:user.uid,
                name:user?.displayName,
                email:user?.email
            })
            setLoadingAuth(false);

        }else{
            //Nao tem user logado
            setUser(null);
            setLoadingAuth(false);
        }

    })
        
    return () =>{
        onsub();
    }
}, [])

function handleInfoUser({uid, name, email}: UserProps){
    setUser({
        uid,
        name,
        email,
    })
}

    return(
    <AuthContext.Provider
     value={{signed: !! user,
         loadingAuth,
        handleInfoUser,
        user,
        }}
     >
        {children} 
    </AuthContext.Provider>
    )
}
export default AuthProvider;