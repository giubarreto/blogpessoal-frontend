import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
// Importa hooks do React para manipular estado, efeitos colaterais e tipos de eventos

import { useNavigate } from 'react-router-dom'
// Importa hook para navegação programática entre rotas

import type Usuario from '../../models/Usuarios'
// Importa o tipo Usuario para tipagem do objeto usuário

import './Cadastro.css'
// Importa o arquivo de estilos CSS específico para a página de cadastro

import { RotatingLines } from 'react-loader-spinner'
// Importa componente de loading animado
import { cadastrarUsuario } from '../../services/Service'
import { ToastAlerta } from '../../utils/ToastAlerta'

// Importa a função para cadastrar usuário na API

function Cadastro() {

  const navigate = useNavigate()
  // Inicializa o hook de navegação

  const [isLoading, setIsLoading] = useState<boolean>(false)
  // Estado para controlar se o botão de cadastro está em loading

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")
  // Estado para armazenar o valor do campo de confirmação de senha

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })
  // Estado para armazenar os dados do usuário a ser cadastrado

  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])
  // Efeito que redireciona para login se o cadastro for bem-sucedido (id diferente de 0)

  function retornar(){
    navigate('/login')
  }
  // Função para redirecionar para a página de login

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  // Atualiza o estado do usuário conforme o usuário digita nos campos do formulário

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmaSenha(e.target.value)
  }
  // Atualiza o estado da confirmação de senha

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    // Previne o comportamento padrão do formulário

    if(confirmaSenha === usuario.senha && usuario.senha.length >= 8){
      // Verifica se as senhas coincidem e se a senha tem pelo menos 8 caracteres

      setIsLoading(true)
      // Ativa o loading

      try{
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        // Chama a função para cadastrar o usuário na API
       ToastAlerta("Usuário foi cadastrado com sucesso!", "sucesso")
      }catch(error){
        ToastAlerta("Erro ao cadastrar usuário!", "erro")
      }
    }else{
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''})
      // Limpa o campo senha
      setConfirmaSenha('')
      // Limpa o campo de confirmação de senha
    }

    setIsLoading(false)
    // Desativa o loading
  }
  
  // Renderização do formulário de cadastro
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        {/* 
          grid: ativa o layout grid
          grid-cols-1: 1 coluna em telas pequenas
          lg:grid-cols-2: 2 colunas em telas grandes
          h-screen: altura igual à tela
          place-items-center: centraliza conteúdo vertical e horizontalmente
          font-bold: texto em negrito
        */}
        <div className="fundoCadastro hidden lg:block"></div>
        {/* 
          fundoCadastro: classe CSS personalizada para o fundo do lado esquerdo
          hidden: esconde o elemento em telas pequenas
          lg:block: exibe o elemento em telas grandes
        */}
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
          onSubmit={cadastrarNovoUsuario}>
          {/* 
            flex: ativa o layout flexbox
            justify-center: centraliza horizontalmente
            items-center: centraliza verticalmente
            flex-col: organiza os itens em coluna
            w-2/3: largura de 2/3 do container
            gap-3: espaçamento entre os elementos
          */}
          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          {/* 
            text-slate-900: cor do texto cinza escuro
            text-5xl: tamanho grande do texto
          */}
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              // border-2: borda de 2px
              // border-slate-700: cor da borda cinza escuro
              // rounded: cantos arredondados
              // p-2: padding interno
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              // Atualiza o estado do usuário ao digitar
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              // Atualiza o estado do usuário ao digitar
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              // Atualiza o estado do usuário ao digitar
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              // Atualiza o estado do usuário ao digitar
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              // Atualiza o estado da confirmação de senha ao digitar
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            {/* 
              flex: ativa o layout flexbox
              justify-around: espaça os botões igualmente
              w-full: largura total
              gap-8: espaçamento grande entre os botões
            */}
            <button 
                type='reset'
                className='rounded text-white bg-red-400 
                hover:bg-red-700 w-1/2 py-2' 
                // rounded: cantos arredondados
                // text-white: texto branco
                // bg-red-400: fundo vermelho claro
                // hover:bg-red-700: fundo vermelho escuro ao passar o mouse
                // w-1/2: metade da largura do container
                // py-2: padding vertical
                onClick={retornar}
            >
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center' 
                // rounded: cantos arredondados
                // text-white: texto branco
                // bg-indigo-400: fundo azul claro
                // hover:bg-indigo-900: fundo azul escuro ao passar o mouse
                // w-1/2: metade da largura do container
                // py-2: padding vertical
                // flex justify-center: centraliza o conteúdo do botão
                >
                  {isLoading ? <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                    <span>Cadastrar</span>
                  }
              
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro