import ListaPostagens from "../../components/postagens/cardpostagens/listapostagens/ListaPostagens"
// Importa o componente que exibe a lista de postagens

import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"
// Importa o componente do modal para criar nova postagem

function Home() {
    return (
        <>
            {/* Div principal com fundo azul escuro e centralização */}
            <div className="bg-indigo-900 flex justify-center">
                {/* Container com grid de 2 colunas e texto branco */}
                <div className='container grid grid-cols-2 text-white'>
                    {/* Coluna da esquerda: textos e botão de nova postagem */}
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja Bem Vindo!
                        </h2>
                        <p className='text-xl'>
                            Expresse aqui seus pensamentos e opiniões
                        </p>

                        {/* Botão para abrir o modal de nova postagem */}
                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    {/* Coluna da direita: imagem ilustrativa */}
                    <div className="flex justify-center ">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem Página Home"
                            className='w-2/3'
                        />
                    </div>
                </div>
            </div>

            {/* Lista de postagens abaixo do banner principal */}
            <ListaPostagens />
        </>
    )
}

export default Home
// Exporta o componente Home como padrão