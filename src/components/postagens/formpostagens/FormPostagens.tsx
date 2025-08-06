import { useState, useContext, useEffect, type ChangeEvent } from "react"; // Importa hooks do React e o tipo ChangeEvent
import { useNavigate, useParams } from "react-router-dom"; // Importa hooks para navegação e parâmetros de rota
import { AuthContext } from "../../../contexts/AuthContext"; // Importa o contexto de autenticação
import type Postagem from "../../../models/Postagem"; // Importa o tipo Postagem
import type Tema from "../../../models/Tema"; // Importa o tipo Tema
import { buscar, atualizar, cadastrar } from "../../../services/Service"; // Importa funções para requisições à API
import { RotatingLines } from "react-loader-spinner"; // Importa componente de loading animado
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {

    const navigate = useNavigate(); // Hook para navegação programática

    const [isLoading, setIsLoading] = useState<boolean>(false) // Estado para controlar o loading do botão
    const [temas, setTemas] = useState<Tema[]>([]) // Estado para armazenar a lista de temas

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', }) // Estado para o tema selecionado
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem) // Estado para a postagem (edição ou criação)

    const { id } = useParams<{ id: string }>() // Obtém o parâmetro 'id' da URL (para edição)

    const { usuario, handleLogout } = useContext(AuthContext) // Acessa usuário e função de logout do contexto de autenticação
    const token = usuario.token // Extrai o token do usuário autenticado

    // Busca uma postagem pelo id (para edição)
    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // Busca um tema pelo id (quando selecionado no select)
    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // Busca todos os temas disponíveis
    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // useEffect para garantir que o usuário está logado
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token])

    // useEffect para buscar temas e, se for edição, buscar a postagem pelo id
    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    // useEffect para atualizar o tema da postagem sempre que o tema mudar
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    // Atualiza o estado da postagem conforme o usuário digita nos inputs
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    // Função para voltar para a lista de postagens
    function retornar() {
        navigate('/postagens');
    }

    // Função para cadastrar ou atualizar uma postagem ao submeter o formulário
    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) { // Se existe id, é edição
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                  ToastAlerta("Postagem atualizada com sucesso!", "sucesso")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                       ToastAlerta("erro ao atualizar postagem!", "erro")
                }
            }

        } else { // Se não existe id, é cadastro
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                   ToastAlerta("Postagem cadastrada com sucesso!", "sucesso")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                      ToastAlerta("Erro ao cadastrar postagem!", "erro")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    // Variável booleana para desabilitar o botão enquanto o tema não está carregado
    const carregandoTema = tema.descricao === '';

    // Renderização do formulário
    return (
        <div className="container flex flex-col mx-auto items-center">
            {/* Título dinâmico: editar ou cadastrar */}
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            {/* Formulário de cadastro/edição */}
            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da Postagem</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        {/* Opção padrão desabilitada */}
                        <option value="" selected disabled>Selecione um Tema</option>

                        {/* Lista de temas disponíveis */}
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.descricao}</option>
                            </>
                        ))}

                    </select>
                </div>
                {/* Botão de submit, mostra loading se necessário */}
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoTema}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

// Exporta o componente como padrão
export default FormPostagem;