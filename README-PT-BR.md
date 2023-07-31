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
---
## Me compra um café

Se você usa/usou este projeto, aprendeu algo com ele ou simplesmente curtiu, por favor considere dar uma força me comprando um café, pois assim eu posso dedicar mais tempo em projetos Opensource como esse :)

<a href="https://www.buymeacoffee.com/sandermendes" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Estrutura do projeto
![Sander Mendes App Project-001](https://raw.githubusercontent.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/assets/Project-001-2023-07-24-1929.png)

## Visão Geral da Arquitetura

O projeto é composto pelos seguintes componentes:

1. **Serviço GraphQL**: Atua como ponto de entrada para receber solicitações GraphQL dos clientes. Ele lida com as solicitações recebidas e as encaminha para as funções de resolução apropriadas para processamento.

2. **Serviço de Conta**: Serve como intermediário entre o serviço GraphQL e o serviço de Usuário. Ele lida com funcionalidades relacionadas a contas, como autenticação, autorização e gerenciamento de contas.

3. **Serviço de Usuário**: Responsável por gerenciar operações específicas do usuário. Ele lida com a lógica de negócios relacionada aos usuários, como criação, recuperação, atualização e exclusão de usuários. O serviço de Usuário interage com o banco de dados para realizar essas operações.

4. **Banco de Dados**: Armazena informações do usuário e fornece armazenamento persistente para o sistema. O serviço de Usuário interage com o banco de dados para armazenar e recuperar dados do usuário.

O fluxo de dados começa com uma solicitação GraphQL chegando ao serviço GraphQL. A solicitação é encaminhada para o serviço de Conta, que lida com a autenticação e autorização. Uma vez autenticado e autorizado, o serviço de Conta se comunica com o serviço de Usuário para realizar operações relacionadas ao usuário. O serviço de Usuário interage com o banco de dados para armazenar ou recuperar dados do usuário conforme necessário. A resposta segue o caminho inverso, com o serviço de Usuário fornecendo a resposta ao serviço de Conta, que retorna a resposta ao serviço GraphQL para entrega final ao cliente.

## Página de Login

Acesse a página de login na url: [http://localhost:4050/](http://localhost:4050/)

Este sistema de login funciona de forma semelhante ao Google Single Sign-On, permitindo um login único para todos os aplicativos. Utiliza um Cookie Session gerado pelo servidor, respeitando o domínio com o uso do coringa "\*". Por exemplo, um cookie gerado com "\*.example.com" permitirá que solicitações de app-test.example.com compartilhem a mesma informação de login com o domínio principal. Isso proporciona uma experiência de login única, integrada e consistente em diferentes aplicativos dentro do mesmo domínio.
Ao acessar a url, após processamento, a mesma irá incluir um parametro redirect_uri, que depois do sucesso na autenticação, irá redirecionar o usuário para a uri que está no parametro redirect_uri, se nenhuma for informada, o mesmo incluirá a uri que redireciona para o aplicativo padrão, configurações do usuário, eg:
```
http://localhost:4050/signin/v1/identifier?redirect_uri=http%3A%2F%2Flocalhost%3A4000
```
Dados para test de login:
```
Email:
janedoe@acme.corp

Senha:
123456
```

![Sander Mendes App Project-001](https://raw.githubusercontent.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/assets/Project-001-Login-Page-2023-07-14%2010-27-06.png)

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
Esse comando iniciará os serviços necessários e configurará o ambiente dentro de um contêiner Docker.

## Teste do Serviço GraphQL ::TODO::

## Teste do Serviço de Conta ::TODO::

## Teste do Serviço de Usuário
![User Service Test](https://raw.githubusercontent.com/sandermendes/Go-Golang-Gorm-Postgres-Gqlgen-Graphql/main/assets/Screenshot%20from%202023-06-29%2019-47-16.png)

Sinta-se à vontade para explorar o código e fazer quaisquer melhorias ou modificações para atender às suas necessidades!