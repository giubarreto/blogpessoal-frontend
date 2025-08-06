import Popup from 'reactjs-popup'; // Importa o componente Popup da biblioteca reactjs-popup
import 'reactjs-popup/dist/index.css'; // Importa o CSS padrão do popup
import './ModalPostagem.css' // Importa o CSS customizado para o modal
import FormPostagem from '../formpostagens/FormPostagens';


function ModalPostagem() {
    return (
        <>
            {/* Componente Popup que exibe um modal ao clicar no botão */}
            <Popup
                trigger={
                    // Botão que abre o modal ao ser clicado
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Nova Postagem
                    </button>
                }
                modal // Define que o popup será exibido como modal (centralizado e com overlay)
            >
                {/* Conteúdo do modal: formulário de postagem */}
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem; // Exporta o componente