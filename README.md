# Programming School

## VISÃO GERAL

Desenvolver o MVP de uma aplicação web e publicar seu
código em um repositório público Github.

## CASO DE USO

Nosso cliente possui uma escola de programação, onde são ministrados cursos tipo Java,
Python, JS, PHP, etc. O cliente deseja um sistema que permita o controle do fluxo de:

|  ID  | Autor     |                                                                                                                                                         Descrição                                                                                                                                                         | Prioridade |
| :--: | --------- | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------- |
| RF01 | Staff     |                                                                                                       Usuários com permissão administrativa na plataforma, podem criar/cadastrar alunos cursos e professores novos.                                                                                                       | Essencial  |
| RF02 | Professor |                                                Deverá ser cadastrado por um usuário membro da Staff; Poderá ter acesso a lista de alunos e cursos; Na tela de listagem de cursos poderá verificar o total de alunos em determinado curso que o professor está ministrando.                                                | Essencial  |
| RF04 | Aluno     | Deverá ser cadastrado por um usuário membro da Staff; Poderá realizar login no sistema para verificar e editar suas informações pessoais e também verificar os cursos que está matriculado; Poderá se registrar em um ou vários cursos; Aluno poderá avaliar o curso que está matriculado usando um botão de Like/Deslike | Essencial  |
| RF05 | Cursos    |                                              Poderão ser cadastrados apenas pelos membros da Staff; Deverá vincular um professor a um curso durante o cadastro do curso; Um curso só pode ter apenas um único professor; Um curso poderá ter um ou mais alunos matriculados                                               | Essencial  |

&nbsp;
&nbsp;

## OBJETIVOS E ESPECIFICAÇÃO

1. O cadastro de alunos e o cadastro de professores deverá ser feito apenas pelos usuários
   membros do Staff e ele deverá contemplar os seguintes campos nos formulários (nome,
   sobrenome, email, estado, cidade, endereço, telefones). OBS: Deve permitir cadastrar
   mais de um telefone para o mesmo aluno e professor.

2. No cadastro de curso deverá ter os seguintes campos(nome do curso, ativo, data de
   início, data de término, professor).

3. Os 3 tipos de usuários(staff, professor e aluno) poderão realizar login na aplicação mas
   cada um deverá ter acesso apenas às seus respectivos endpoint.

4. Os endpoints de listagem devem permitir a filtragem por nome e ativos(sim/não).

## TECNOLOGIAS & FERRAMENTAS

- Typescript
- NodeJS
- Express
- Postgres / MySQL
- Sequelize, Typeorm ou Prisma
- Swagger

## INFRAESTRUTURA

- Docker
- Docker Compose

## CONTROLE DE VERSÃO

- Git / GitHub

## ARQUITETURA

- Clean Architecture

## DIFERENCIAIS

- CI/CD
- Testes(jest/swc)
- Clean Code
- Deploy no Heroku
