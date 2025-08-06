// Importa o componente Link para navegação entre rotas
import { Link } from 'react-router-dom'
// Importa o tipo Postagem para tipagem das props
import type Postagem from '../../../models/Postagem'

// Define a interface das props esperadas pelo componente
interface CardPostagensProps {
    postagem: Postagem // O componente espera receber uma postagem do tipo Postagem
}

// Declaração do componente funcional CardPostagem, recebendo uma postagem via props
function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        // Div principal do card, com borda, cantos arredondados, layout em coluna e espaçamento entre os elementos
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                {/* Cabeçalho do card, com fundo azul, padding, alinhamento dos itens e espaçamento */}
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    {/* Foto do usuário da postagem, arredondada */}
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome} />
                    {/* Nome do usuário, texto grande, negrito, centralizado e em maiúsculas */}
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                {/* Corpo do card, com padding */}
                <div className='p-4 '>
                    {/* Título da postagem, texto grande, negrito e em maiúsculas */}
                    <h4 className='text-lg font-semibold uppercase'>{postagem.titulo}</h4>
                    {/* Texto da postagem */}
                    <p>{postagem.texto}</p>
                    {/* Descrição do tema da postagem */}
                    <p>Tema: {postagem.tema?.descricao}</p>
                    {/* Data formatada da postagem, usando Intl.DateTimeFormat para exibir data e hora completas */}
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>
            {/* Rodapé do card, com botões de editar e deletar */}
            <div className="flex">
                {/* Botão para editar a postagem, estilizado e com navegação para a rota de edição */}
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                {/* Botão para deletar a postagem, estilizado e com navegação para a rota de deleção */}
                <Link to={`/deletarpostagem/${postagem.id}`} 
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}
 export default CardPostagem
// Exporta o componente CardPostagem como padrão