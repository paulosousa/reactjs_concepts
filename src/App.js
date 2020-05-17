import React, {useState, useEffect} from "react";

import api from "./services/api"

import "./styles.css";



function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
    }, []);

  async function handleAddRepository() {
    // title: `Desafio ReactJS ${Date.now()}`  ,

    const response = await api.post('/repositories', {
      url: "https://github.com/Rocketseat/new_repository",
      title: `New Repositorie ${Date.now()}`  ,
      techs: ["Node", "Express", "TypeScript", "Java"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    api.delete(`/repositories/${id}`);
    
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    repositories.splice(repositorieIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
