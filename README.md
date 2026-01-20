# Tech Challenge Fase 2 - Sistema de Gestão de Oficina Mecânica

Projeto desenvolvido para o Tech Challenge da FIAP, implementando um sistema completo de gestão de oficina mecanica utilizando Clean Architecture, Kubernetes e Terraform.

## Sobre o Projeto

Este sistema permite gerenciar clientes, veiculos, serviços, peças e ordens de serviço de uma oficina mecanica. Foi desenvolvido seguindo os principios de Clean Architecture para garantir manutenção e escalabilidade.

## Tecnologias Utilizadas

- Node.js 20.x com NestJS
- TypeScript
- PostgreSQL 15
- Docker e Docker Compose
- Kubernetes (manifestos prontos)
- Terraform (IaC)
- GitHub Actions (CI/CD)

## Estrutura do Projeto

A aplicação segue Clean Architecture com as seguintes camadas:

- **domain/** - Entidades de negocio e value objects
- **application/** - Casos de uso e regras de negocio
- **infrastructure/** - Implementações de banco de dados e serviços externos
- **presentation/** - Controllers e DTOs para API REST

## Pre-requisitos

Para rodar o projeto localmente voce precisa ter instalado:

- Docker e Docker Compose
- Node.js 20 ou superior (para desenvolvimento)
- kubectl (para validar Kubernetes)
- Minikube (para rodar cluster local)
- Terraform (para IaC)

## Como executar

### Opção 1: Docker Compose (recomendado para testes rapidos)
```bash
docker-compose up -d
```

A API estará disponivel em http://localhost:3000

Documentação Swagger: http://localhost:3000/api/docs

Para parar:
```bash
docker-compose down
```

### Opção 2: Kubernetes

Primeiro certifique que o Minikube está rodando:
```bash
minikube start
```

Depois aplique os manifestos:
```bash
kubectl apply -f k8s/
```

Aguarde os pods subirem (pode levar alguns segundos):
```bash
kubectl get pods -n oficina-mecanica
```

Para acessar a API localmente:
```bash
kubectl port-forward -n oficina-mecanica svc/oficina-mecanica-api-service 3000:3000
```

### Opção 3: Terraform

Entre na pasta terraform:
```bash
cd terraform
```

Inicialize e valide:
```bash
terraform init
terraform validate
terraform plan
```

Para aplicar a infraestrutura:
```bash
terraform apply
```

## Endpoints da API

A API expõe os seguintes endpoints principais:

- GET /api/v1/health - verifica se a aplicação está rodando
- GET /api/v1/clientes - lista todos os clientes
- POST /api/v1/clientes - cria um novo cliente
- GET /api/v1/veiculos - lista veiculos
- POST /api/v1/veiculos - adiciona veiculo
- GET /api/v1/ordens-servico - lista ordens de serviço
- POST /api/v1/ordens-servico - cria ordem de serviço

Para mais detalhes acesse a documentação Swagger em /api/docs

## Testes

Para rodar os testes localmente:
```bash
npm install
npm test
```

## CI/CD

O projeto possui pipeline automatizado no GitHub Actions que executa em cada push:

- Build da aplicação
- Testes unitarios
- Validação do codigo

## Estrutura de Pastas
```
.
├── src/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
├── k8s/
├── terraform/
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## Configuração

As variaveis de ambiente podem ser configuradas no arquivo .env:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=oficina
DB_PASSWORD=oficina123
DB_DATABASE=oficina_mecanica
NODE_ENV=development
PORT=3000
```

## Problemas Comuns

**Erro: porta 3000 já esta em uso**

Solução: pare outros serviços ou mude a porta no .env

**Erro: connection refused ao conectar no banco**

Solução: verifique se o PostgreSQL esta rodando

**Pods não sobem no Kubernetes**

Solução: verifique os logs com kubectl logs

## Licença

Este projeto foi desenvolvido para fins educacionais como parte do Tech Challenge da FIAP.

## Autor

Tiago Machado

## Arquitetura

Para detalhes completos da arquitetura, veja [ARQUITETURA.md](./ARQUITETURA.md)

## Collection das APIs

A documentação completa das APIs está disponível via Swagger:

**URL local:** http://localhost:3000/api/docs

Principais endpoints:
- `GET /api/v1/health` - Health check
- `GET /api/v1/clientes` - Listar clientes
- `POST /api/v1/clientes` - Criar cliente
- `GET /api/v1/veiculos` - Listar veiculos
- `POST /api/v1/veiculos` - Criar veiculo
- `GET /api/v1/ordens-servico` - Listar ordens de serviço
- `POST /api/v1/ordens-servico` - Criar ordem de serviço

## Video Demonstrativo

[Link sera adicionado apos gravacao]

