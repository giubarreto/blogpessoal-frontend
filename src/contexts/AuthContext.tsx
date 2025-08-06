import { createContext, type ReactNode, useState } from "react" // Importa funções e tipos do React

import type UsuarioLogin from "../models/UsuarioLogin" // Importa o tipo UsuarioLogin para tipagem
import { login } from "../services/Service" // Importa a função de login da API
import { ToastAlerta } from "../utils/ToastAlerta"

// Define a interface das propriedades do contexto de autenticação
interface AuthContextProps {
    usuario: UsuarioLogin // Usuário autenticado
    handleLogout(): void // Função para logout
    handleLogin(usuario: UsuarioLogin): Promise<void> // Função para login
    isLoading: boolean // Estado de carregamento (loading)
}

// Interface para as props do AuthProvider (componente que envolve a aplicação)
interface AuthProviderProps {
    children: ReactNode // Elementos filhos que serão envolvidos pelo provider
}

// Cria o contexto de autenticação com o tipo definido acima
export const AuthContext = createContext({} as AuthContextProps)

// Componente provider que fornece o contexto para os componentes filhos
export function AuthProvider({ children }: AuthProviderProps) {

    // Estado para armazenar os dados do usuário autenticado
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // Estado para controlar se está carregando (usado durante login)
    const [isLoading, setIsLoading] = useState(false)

    // Função para autenticar o usuário
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true) // Ativa o loading
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario) // Chama a API de login e atualiza o usuário
           ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }
        setIsLoading(false) // Desativa o loading
    }

    // Função para deslogar o usuário (limpa os dados)
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    // Retorna o provider do contexto, disponibilizando os valores e funções para os filhos
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children} {/* Renderiza os componentes filhos dentro do provider */}  
                  </AuthContext.Provider>
    )
}         