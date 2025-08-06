import { useContext, useEffect } from "react"
// Importa hooks do React para acessar contexto e efeitos colaterais

import { useNavigate } from "react-router-dom"
// Importa hook para navegação programática

import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
// Importa o contexto de autenticação para acessar dados do usuário

function Perfil() {
    const navigate = useNavigate()
    // Inicializa o hook de navegação

    const { usuario } = useContext(AuthContext)
    // Obtém o usuário autenticado do contexto

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate("/")
        }
    }, [usuario.token])
    // Se o usuário não estiver logado (token vazio), exibe alerta e redireciona para a página inicial

    return (
        <div className="flex justify-center mx-4">
            {/* Container principal centralizado com margem horizontal */}
            <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
                {/* Container com bordas arredondadas e overflow escondido */}
                <img
                    className="w-full h-72 object-cover border-b-8 border-white"
                    // Imagem de capa do perfil, ocupa toda a largura, altura fixa, cobre o espaço e tem borda inferior branca
                    src="https://i.imgur.com/ZZFAmzo.jpg"
                    alt="Capa do Perfil"
                />

                <img
                    className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-white relative z-10"
                    // Foto de perfil do usuário, circular, centralizada, sobreposta à capa, com borda branca
					src={usuario.foto}
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div
                    className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-sky-500 text-white text-2xl items-center justify-center"
                    // Card azul com texto branco, centralizado, sobreposto à imagem de capa
                >
                    <p>Nome: {usuario.nome} </p>
                    {/* Exibe o nome do usuário */}
                    <p>Email: {usuario.usuario}</p>
                    {/* Exibe o e-mail (usuário) */}
                </div>
            </div>
        </div>
    )
}

export default Perfil
// Exporta o componente Perfil