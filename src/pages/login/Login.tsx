import { Link, useNavigate } from 'react-router-dom';
// Importa o componente Link para navegação entre páginas e o hook useNavigate para navegação programática

import './Login.css';
// Importa o CSS específico da página de login

import { AuthContext } from '../../contexts/AuthContext';
// Importa o contexto de autenticação

import { type ChangeEvent, useContext, useEffect, useState } from 'react';
// Importa hooks do React e o tipo ChangeEvent

import type  UsuarioLogin from '../../models/UsuarioLogin';
// Importa o tipo UsuarioLogin para tipagem do estado

import { RotatingLines } from 'react-loader-spinner';
// Importa componente de loading animado

function Login() {

    const navigate = useNavigate();
    // Inicializa o hook de navegação

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)
    // Usa o contexto de autenticação para acessar o usuário, função de login e estado de loading

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )
    // Estado para armazenar os dados do formulário de login

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])
    // Se o usuário já estiver autenticado (token diferente de vazio), redireciona para a home

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }
    // Atualiza o estado do formulário conforme o usuário digita

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }
    // Ao submeter o formulário, chama a função de login do contexto

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 
                    h-screen place-items-center font-bold ">
                {/* 
                    grid: ativa o layout grid
                    grid-cols-1: 1 coluna em telas pequenas
                    lg:grid-cols-2: 2 colunas em telas grandes
                    h-screen: altura igual à tela
                    place-items-center: centraliza conteúdo vertical e horizontalmente
                    font-bold: texto em negrito
                */}
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}>
                    {/* 
                        flex: ativa o layout flexbox
                        justify-center: centraliza horizontalmente
                        items-center: centraliza verticalmente
                        flex-col: organiza os itens em coluna
                        w-1/2: largura de metade do container
                        gap-4: espaçamento entre os elementos
                    */}
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    {/* Título do formulário */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                        {/* 
                            rounded: cantos arredondados
                            bg-indigo-400: fundo azul claro
                            hover:bg-indigo-900: fundo azul escuro ao passar o mouse
                            text-white: texto branco
                            w-1/2: metade da largura do container
                            py-2: padding vertical
                            flex justify-center: centraliza o conteúdo do botão
                        */}
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />
                    {/* Linha divisória */}

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
                {/* 
                    fundoLogin: classe CSS personalizada para o fundo do lado direito
                    hidden: esconde o elemento em telas pequenas
                    lg:block: exibe o elemento em telas grandes
                */}
            </div>
        </>
    );
}

export default Login;
// Exporta o componente Login como padrão