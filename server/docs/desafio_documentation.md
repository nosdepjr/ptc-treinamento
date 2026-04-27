# 📄 Resumo das Decisões de Implementação

Em suma, o sistema foi estruturado em **Controller** e **Repository** para separar responsabilidades e facilitar a manutenção. Dessa forma, foi implementado um CRUD completo com validações básicas e uso de **PATCH** para atualização parcial. Os filtros por tamanho e marca foram feitos via query params, utilizando buscas simples no banco (case-insensitive para marca) e a contagem de estoque utiliza agregação (`_sum`) para retornar o total de pares disponíveis. A solução é simples, organizada e segue boas práticas de APIs REST.

---

## 📌 Estrutura e Organização

Para o desenvolvimento do sistema, as responsabilidades foram separadas em duas camadas principais:

* **Controller**: responsável por receber as requisições HTTP, validar os dados e retornar as respostas
* **Repository**: responsável pela comunicação direta com o banco de dados utilizando o Prisma

---

## ⚙️ Implementação das Funcionalidades

### 🔹 CRUD de Calçados

As operações básicas foram implementadas da seguinte forma:

* **Criação**: valida os campos obrigatórios e insere um novo registro no banco
* **Listagem**: retorna todos os calçados cadastrados
* **Atualização (PATCH)**: atualiza apenas os campos enviados na requisição, evitando sobrescrever dados desnecessariamente
* **Exclusão**: remove o registro após verificar se ele existe

---

### 🔍 Busca por tamanho

Essa funcionalidade foi implementada através de um filtro simples no banco.

Foi criada uma função no repository que busca calçados pelo campo `tamanho`, e o controller recebe esse valor via query param.

---

### 🏷️ Filtro por marca

Semelhante ao filtro por tamanho, a busca por marca foi implementada utilizando o operador `contains` do Prisma, permitindo buscas parciais e sem diferenciação entre maiúsculas e minúsculas.

---

### 📦 Contagem de estoque

Utiliza a função de agregação do Prisma (_sum) no campo quantidade_em_estoque, garantindo o total real de pares disponíveis no sistema, além da possibilidade de contagem de registros.

---

## 🤖 Uso de Inteligência Artificial

### **O ChatGPT foi utilizado como ferramenta de apoio para:**

* Implementação da entidade User, para adquirir familiaridade e prática com as ferramentas e tecnologias do projeto 
* Revisão de código (auxílio de boas práticas e análise de lógica)
* Interpretação de mensagens de erro e logs
* Auxílio na construção de queries com Prisma
* Apoio em pesquisas gerais durante o desenvolvimento
* Padronização de mensagens nos commits
