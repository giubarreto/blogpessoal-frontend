import axios from "axios";
// Importa a biblioteca axios para fazer requisições HTTP

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
// Cria uma instância do axios com a baseURL da API do blog pessoal

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    // Função para cadastrar um novo usuário
    const resposta = await api.post(url, dados)
    // Faz uma requisição POST para a URL informada, enviando os dados do usuário
    setDados(resposta.data)
    // Atualiza o estado com a resposta da API
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    // Função para autenticar o usuário (login)
    const resposta = await api.post(url, dados)
    // Faz uma requisição POST para a URL informada, enviando os dados de login
    setDados(resposta.data)
    // Atualiza o estado com a resposta da API (inclui token)
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    // Função para buscar dados na API (GET)
    const resposta = await api.get(url, header)
    // Faz uma requisição GET para a URL informada, usando os headers (ex: Authorization)
    setDados(resposta.data)
    // Atualiza o estado com os dados recebidos
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    // Função para cadastrar um novo recurso (ex: postagem, tema)
    const resposta = await api.post(url, dados, header)
    // Faz uma requisição POST para a URL informada, enviando os dados e headers
    setDados(resposta.data)
    // Atualiza o estado com a resposta da API
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    // Função para atualizar um recurso existente (PUT)
    const resposta = await api.put(url, dados, header)
    // Faz uma requisição PUT para a URL informada, enviando os dados e headers
    setDados(resposta.data)
    // Atualiza o estado com a resposta da API
}

export const deletar = async (url: string, header: Object) => {
    // Função para deletar um recurso (DELETE)
    await api.delete(url, header)
    // Faz uma requisição DELETE para a URL informada, usando os headers
}