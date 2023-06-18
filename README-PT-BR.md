# Projeto

**Golang-Gorm-Postgres-Gqlgen-Graphql-gRPC** é um projeto que demonstra a implementação de um sistema utilizando várias tecnologias e frameworks.

## Tecnologias Utilizadas

1. **DevContainer**: Fornece um ambiente de desenvolvimento consistente e reprodutível.
2. **Gorm**: Um poderoso framework ORM em Go para simplificar as interações com o banco de dados e permitir um acesso eficiente aos dados.
3. **Postgres**: Um sistema de gerenciamento de banco de dados relacional de código aberto, escalável e confiável.
4. **Gqlgen**: Uma biblioteca em Go que simplifica o desenvolvimento de servidores GraphQL, gerando automaticamente o código com base no esquema GraphQL.
5. **GraphQL**: Uma linguagem de consulta moderna e tempo de execução para APIs, permitindo a recuperação de dados eficiente e flexível.
6. **gRPC**: Um framework de alto desempenho e agnóstico de linguagem para construir sistemas distribuídos com comunicação eficiente.
7. **Protobuf**: Um formato de serialização de dados agnóstico de linguagem para comunicação estruturada de dados.

## Estrutura do projeto
![Sander Mendes App Project-001](https://raw.githubusercontent.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/assets/Project-001-2023-06-14-1843.png)

## Visão Geral da Arquitetura

O projeto é composto pelos seguintes componentes:

1. **Serviço GraphQL**: Atua como ponto de entrada para receber solicitações GraphQL dos clientes. Ele lida com as solicitações recebidas e as encaminha para as funções de resolução apropriadas para processamento.

2. **Serviço de Conta**: Serve como intermediário entre o serviço GraphQL e o serviço de Usuário. Ele lida com funcionalidades relacionadas a contas, como autenticação, autorização e gerenciamento de contas.

3. **Serviço de Usuário**: Responsável por gerenciar operações específicas do usuário. Ele lida com a lógica de negócios relacionada aos usuários, como criação, recuperação, atualização e exclusão de usuários. O serviço de Usuário interage com o banco de dados para realizar essas operações.

4. **Banco de Dados**: Armazena informações do usuário e fornece armazenamento persistente para o sistema. O serviço de Usuário interage com o banco de dados para armazenar e recuperar dados do usuário.

O fluxo de dados começa com uma solicitação GraphQL chegando ao serviço GraphQL. A solicitação é encaminhada para o serviço de Conta, que lida com a autenticação e autorização. Uma vez autenticado e autorizado, o serviço de Conta se comunica com o serviço de Usuário para realizar operações relacionadas ao usuário. O serviço de Usuário interage com o banco de dados para armazenar ou recuperar dados do usuário conforme necessário. A resposta segue o caminho inverso, com o serviço de Usuário fornecendo a resposta ao serviço de Conta, que retorna a resposta ao serviço GraphQL para entrega final ao cliente.

## Geração de Arquivos Protobuf

Para gerar os arquivos Protobuf, execute o seguinte comando se houverem alter

ações nos arquivos *.proto:
```
$ ./generate-protobufs.sh
```
Observação: Execute este comando dentro do terminal do contêiner de desenvolvimento.

## Geração de Arquivos de Esquema GraphQL

Para gerar/regenerar os arquivos GraphQL, execute o seguinte comando se houverem alterações no arquivo schema.graphql:
```
$ ./generate-graphql.sh
```
Observação: Execute este comando dentro do terminal do contêiner de desenvolvimento.

## Servidor GraphQL Público

O servidor GraphQL principal pode ser acessado em: [http://localhost:8080/](http://localhost:8080/)

## Adminer

O Adminer, uma ferramenta de gerenciamento de banco de dados, pode ser acessado em: [http://localhost:8088/](http://localhost:8088/)

## Redis Commander

O Redis Commander, uma ferramenta de gerenciamento do Redis, pode ser acessado em: [http://localhost:8081/](http://localhost:8081/)

Para começar, execute o seguinte comando:
```
$ docker-compose up -d --build
```
Observação: Execute este comando no terminal do host.

Esse comando iniciará os serviços necessários e configurará o ambiente de desenvolvimento dentro de um contêiner Docker.

Sinta-se à vontade para explorar o código e fazer quaisquer melhorias ou modificações para atender às suas necessidades!