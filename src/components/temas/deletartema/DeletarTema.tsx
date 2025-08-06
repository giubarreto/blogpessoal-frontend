import { useState, useContext, useEffect } from "react" // Importa hooks do React para estado, contexto e efeitos colaterais
import { useNavigate, useParams } from "react-router-dom" // Importa hooks para navegação e acesso a parâmetros de rota
import { AuthContext } from "../../../contexts/AuthContext" // Importa o contexto de autenticação
import  type Tema from "../../../models/Tema" // Importa o tipo Tema para tipagem
import { buscar, deletar } from "../../../services/Service" // Importa funções para buscar e deletar dados na API
import { RotatingLines } from "react-loader-spinner" // Importa componente de loading animado
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {

    const navigate = useNavigate() // Hook para navegação programática

    const [tema, setTema] = useState<Tema>({} as Tema) // Estado para armazenar o tema a ser deletado
    const [isLoading, setIsLoading] = useState<boolean>(false) // Estado para controlar o loading do botão "Sim"
    
    const { usuario, handleLogout } = useContext(AuthContext) // Acessa usuário e função de logout do contexto de autenticação
    const token = usuario.token // Extrai o token do usuário autenticado

    const { id } = useParams<{ id: string }>() // Obtém o parâmetro 'id' da URL

    // Função para buscar o tema pelo id
    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token // Envia o token no header para autenticação
                }
            })
        } catch (error: any) {
            // Se o erro for 403 (não autorizado), faz logout
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // useEffect para verificar se o usuário está logado ao carregar o componente
    useEffect(() => {
        if (token === '') {
               ToastAlerta("Você precisa estar logado!", "info")
            navigate('/')
        }
    }, [token])

    // useEffect para buscar o tema quando o id mudar
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    // Função para deletar o tema
    async function deletarTema() {
        setIsLoading(true) // Ativa o loading

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token // Envia o token no header para autenticação
                }
            })

               ToastAlerta("tema apagado com sucesso!", "sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                  ToastAlerta("erro ao deletar tema!", "erro")
            }
        }

        setIsLoading(false) // Desativa o loading
        retornar() // Volta para a lista de temas
    }

    // Função para voltar para a lista de temas
    function retornar() {
        navigate("/temas")
    }
    
    // Renderização do componente
    return (
        <div className='container w-1/3 mx-auto'>
            {/* Título da página */}
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>
            {/* Mensagem de confirmação */}
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            {/* Card com os dados do tema */}
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Tema
                </header>
                {/* Exibe a descrição do tema */}
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                {/* Botões de confirmação */}
                <div className="flex">
                    {/* Botão para cancelar e retornar */}
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    {/* Botão para confirmar e deletar */}
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                                   onClick={deletarTema}>
                        {isLoading ?
                            // Mostra spinner de loading enquanto deleta
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            // Mostra texto "Sim" se não estiver carregando
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

// Exporta o componente como padrão
export default DeletarTema;