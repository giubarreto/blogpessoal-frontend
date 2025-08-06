// Importa o hook useNavigate para navegação programática entre rotas
import { useNavigate } from "react-router-dom";
// Importa hooks do React para estado, contexto e efeitos colaterais
import { useState, useContext, useEffect } from "react";
// Importa o componente de loading DNA do pacote react-loader-spinner
import { DNA } from "react-loader-spinner";
// Importa o componente CardPostagem para exibir cada postagem individualmente
import CardPostagem from "../CardPostagens";
// Importa o tipo Postagem para tipagem das postagens
import type Postagem from "../../../../models/Postagem";
// Importa a função buscar para requisições à API
import { buscar } from "../../../../services/Service";
// Importa o contexto de autenticação para acessar usuário e logout
import { AuthContext } from "../../../../contexts/AuthContext";
import { ToastAlerta } from "../../../../utils/ToastAlerta";


// Declaração do componente funcional ListaPostagens
function ListaPostagens() {

    // Inicializa o hook de navegação
    const navigate = useNavigate();

    // Estado para armazenar o array de postagens
    const [postagens, setPostagens] = useState<Postagem[]>([]);

    // Usa o contexto de autenticação para acessar usuário e função de logout
    const { usuario, handleLogout } = useContext(AuthContext);
    // Extrai o token do usuário autenticado
    const token = usuario.token;

    // Função assíncrona para buscar as postagens na API
    async function buscarPostagens() {
        try {
            // Chama a função buscar, passando o endpoint, setter e headers com token
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            // Se ocorrer erro 403 (não autorizado), faz logout do usuário
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    // useEffect para verificar se o usuário está logado ao carregar o componente
    useEffect(() => {
        if (token === '') {
              ToastAlerta("Você precisa estar logado!", "info")
            navigate('/');
        }
    }, [token])

    // useEffect para buscar postagens sempre que o número de postagens mudar
    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    // Renderiza o componente
    return (
        <>
            {/* Se não houver postagens, exibe o spinner de carregamento */}
            {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            {/* Div principal centralizada e com margem vertical */}
            <div className="flex justify-center w-full my-4">
                {/* Container flexível em coluna com margem horizontal */}
                <div className="container flex flex-col mx-2">
                    {/* Grid responsivo para exibir os cards das postagens */}
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {/* Mapeia cada postagem para um CardPostagem */}
                        {postagens.map((postagem) => (
                            <CardPostagem key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Exporta o componente como padrão
export default ListaPostagens;