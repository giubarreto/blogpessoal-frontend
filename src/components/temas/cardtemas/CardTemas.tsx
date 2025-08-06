import { Link } from 'react-router-dom' // Importa o componente Link para navegação entre rotas
import  type Tema from '../../../models/Tema' // Importa o tipo Tema para tipagem das props

// Define a interface das props esperadas pelo componente
interface CardTemasProps{
    tema: Tema // O componente espera receber um tema do tipo Tema
}

// Declaração do componente funcional CardTemas, recebendo um tema via props
function CardTemas({ tema }: CardTemasProps) {
    return (
        // Div principal do card, com borda, cantos arredondados, layout em coluna e espaçamento entre os elementos
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            {/* Cabeçalho do card, com fundo azul escuro, padding, texto branco e negrito */}
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Tema
            </header>
            {/* Corpo do card, exibe a descrição do tema com texto grande, fundo cinza e altura flexível */}
            <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
            
            {/* Rodapé do card, com botões de editar e deletar */}
            <div className="flex">
                {/* Botão para editar o tema, estilizado e com navegação para a rota de edição */}
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                {/* Botão para deletar o tema, estilizado e com navegação para a rota de deleção */}
                <Link to={`/deletartema/${tema.id}`} 
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

// Exporta o componente como padrão
export default CardTemas;