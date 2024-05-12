import React, { useState } from 'react';

function BuscaDeFilmes() {
  // Estados para armazenar a consulta, os filmes encontrados, mensagens de erro
  const [query, setQuery] = useState(''); // pesquisa
  const [filmes, setFilmes] = useState([]); // lista de filmes encontrados
  const [erro, setErro] = useState(''); // mensagem de erro, se houver

  // Função para buscar filmes com base na consulta
  const buscarFilmes = async () => {
    try {
      // Codifica a consulta para que ela possa ser usada em uma URL
      const encodedQuery = encodeURIComponent(query);
      // Faz uma requisição à API do OMDB para buscar filmes com base na consulta
      const response = await fetch(`http://www.omdbapi.com/?s=${encodedQuery}&apikey=46ad26a4`);
      const data = await response.json(); // Converte a resposta em JSON
      // Verifica se a resposta da API é bem-sucedida
      if (data.Response === 'True') {
        // Se houver filmes encontrados, atualiza o estado 'filmes' com os resultados e limpa a mensagem de erro
        setFilmes(data.Search);
        setErro('');
      } else {
        // Se não houver filmes encontrados, limpa a lista de filmes e define a mensagem de erro recebida da API
        setFilmes([]);
        setErro(data.Error);
      }
    } catch (error) {
      // Se ocorrer algum erro durante a busca de filmes, exibe uma mensagem de erro genérica
      console.error('Erro ao buscar filmes:', error);
      setErro('Erro ao buscar filmes. Por favor, tente novamente mais tarde.');
    }
  };

  // função para atualizar o estado 'query' com o valor digitado pelo usuário
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // função para lidar com o envio do formulário de pesquisa
  const handleSubmit = (event) => {
    event.preventDefault(); // impede o comportamento padrão de envio do formulário
    buscarFilmes(); // chama a função para buscar filmes
  };

  // renderiza o componente de busca de filmes
  return (
    <div>
      <h2>Busca de Filmes</h2>
      {/* Formulário para permitir que o usuário digite o nome do filme a ser pesquisado */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">Buscar</button>
      </form>
      {/* exibe a mensagem de erro, se houver */}
      {erro && <p>{erro}</p>}
      {/* exibe a lista de filmes encontrados, se houver */}
      <div>
        {filmes.map((filme) => (
          <div key={filme.imdbID}>
            <h3>{filme.Title}</h3>
            <img src={filme.Poster} alt={filme.Title} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default BuscaDeFilmes;
