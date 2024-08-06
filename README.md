# EasyNotes

## Descrição

**EasyNotes** é uma aplicação de gerenciamento de tarefas desenvolvida em React Native. A aplicação permite criar, atualizar e excluir anotações, bem como visualizar as tarefas pendentes e finalizadas. Com uma interface simples e intuitiva, EasyNotes ajuda você a manter suas tarefas organizadas e facilmente acessíveis.

## Funcionalidades

- **Criação de Notas**: Permite a criação de novas notas com descrições personalizadas.
- **Atualização de Notas**: Possibilita marcar notas como concluídas ou pendentes.
- **Exclusão de Notas**: Opção para deletar notas com confirmação do usuário.
- **Visualização Filtrada**: Alterna entre a visualização de notas pendentes e finalizadas.
- **Interface Responsiva**: Layout adaptável para diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **React Native**: Framework principal para o desenvolvimento da aplicação.
- **TypeScript**: Linguagem utilizada para adicionar tipagem estática.
- **Expo**: Plataforma para construção de aplicações React Native.
- **Axios**: Biblioteca para requisições HTTP.
- **@expo/vector-icons**: Biblioteca de ícones.
- **react-native-gesture-handler**: Biblioteca para manipulação de gestos.
- **Drizzle ORM**: ORM para gerenciamento de banco de dados.
- **SQLite**: Banco de dados utilizado na aplicação.
- **Nativewind**: Biblioteca para estilização.
- **Expo Router**: Biblioteca para gerenciamento de rotas na aplicação.

## Instalação

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local:

1. **Clone o repositório**:
    ```sh
    git clone https://github.com/seu-usuario/easy-notes.git
    cd easy-notes
    ```

2. **Instale as dependências**:
    ```sh
    npm install
    ```

3. **Gere os arquivos de migração do banco de dados**:
    ```sh
    npx drizzle-kit generate
    ```

4. **Execute a aplicação**:
    ```sh
    npx expo start
    ```

## Configuração do Nativewind

Certifique-se de configurar o Nativewind para estilização:

1. **Instale o Nativewind e suas dependências**:
    ```sh
    npx expo install nativewind@^4.0.1 react-native-reanimated tailwindcss
    ```

2. **Configure o TailwindCSS**:
    Crie um arquivo `tailwind.config.js` na raiz do projeto com o seguinte conteúdo:
    ```js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      presets: [require("nativewind/preset")],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

3. **Configure o Babel**:
    Adicione a configuração do Nativewind no arquivo `babel.config.js`:
    ```js
    module.exports = function (api) {
      api.cache(true);
      return {
        presets: [
          ["babel-preset-expo", { jsxImportSource: "nativewind" }],
          "nativewind/babel",
        ],
        plugins: [
          ["inline-import", { extensions: [".sql"] }],
          "react-native-reanimated/plugin",
        ],
      };
    };
    ```

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte maneira:

```
easy-notes/
│
├── assets/                    # Recursos estáticos (imagens, fontes, etc.)
├── database/                  # Configurações e esquemas do banco de dados
│   ├── drizzle/               # Configurações do Drizzle ORM
│   ├── schemas/               # Esquemas do banco de dados
│
├── hooks/                     # Custom Hooks
│   ├── notes.ts               # Hook para gerenciamento de notas
│
├── screens/                   # Telas da aplicação
│   ├── layout.tsx             # Layout principal da aplicação
│   ├── index.tsx              # Tela principal da aplicação
│
├── app.json                   # Configurações do Expo
├── tsconfig.json              # Configurações do TypeScript
├── tailwind.config.js         # Configurações do TailwindCSS
├── babel.config.js            # Configurações do Babel
├── package.json               # Dependências e scripts do projeto
├── README.md                  # Documentação do projeto
│
```

## Como Usar

1. **Adicionar uma nova nota**:
   - Digite a descrição da nota no campo de texto.
   - Pressione o botão com o ícone de "+" para adicionar a nota.

2. **Marcar uma nota como concluída ou pendente**:
   - Toque na nota que deseja atualizar.
   - A nota será marcada como concluída (com um risco) ou pendente.

3. **Excluir uma nota**:
   - Deslize a nota para a esquerda.
   - Pressione o botão "Excluir Nota" para confirmar a exclusão.

4. **Alternar entre visualização de notas pendentes e finalizadas**:
   - Pressione os botões "Pendentes" ou "Finalizados" na parte superior da tela para filtrar as notas.

## Notas Importantes

- Certifique-se de que todas as dependências estão instaladas corretamente.
- O projeto utiliza Drizzle ORM e SQLite para gerenciamento eficiente do banco de dados.
- O projeto utiliza TypeScript para melhorar a qualidade do código e a manutenção.
- O Expo facilita a execução e a depuração do projeto em diferentes dispositivos.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o repositório.
2. Crie uma nova branch: `git checkout -b minha-nova-funcionalidade`.
3. Faça suas modificações e commit: `git commit -m 'Adiciona nova funcionalidade'`.
4. Faça push para a branch: `git push origin minha-nova-funcionalidade`.
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Caso tenha alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- Email: douglasdsdomiciano@hotmail.com
- GitHub: [doulgs](https://github.com/doulgs)

---

Aproveite o **EasyNotes** para manter suas tarefas organizadas e aumentar sua produtividade!