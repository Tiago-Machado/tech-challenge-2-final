# Arquitetura da Solução

## Visão Geral

Sistema de gestão de oficina mecânica implementado com Clean Architecture, containerizado com Docker e orquestrado com Kubernetes.

## Diagrama de Componentes
```
┌─────────────────────────────────────────────────────────┐
│              GitHub Actions (CI/CD)                     │
│  Build → Testes → Docker Build → Deploy Kubernetes     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│            Kubernetes Cluster (Minikube)                │
│                                                         │
│  ┌─────────────────┐         ┌──────────────────┐     │
│  │  API Deployment │         │  PostgreSQL      │     │
│  │  (2 replicas)   │ ◄─────► │  Deployment      │     │
│  │  + HPA          │         │  (1 replica)     │     │
│  │                 │         │  + PVC (1Gi)     │     │
│  └────────┬────────┘         └──────────────────┘     │
│           │                                            │
│  ┌────────▼──────────┐      ┌──────────────────┐     │
│  │  NodePort Service │      │  ClusterIP       │     │
│  │  Port: 30000      │      │  Service         │     │
│  └───────────────────┘      │  Port: 5432      │     │
│                             └──────────────────┘     │
│                                                       │
│  ConfigMaps: env vars      Secrets: passwords       │
└─────────────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│           Terraform (Infraestrutura como Código)        │
│  Provisiona: Namespace, Deployments, Services, etc      │
└─────────────────────────────────────────────────────────┘
```

## Arquitetura da Aplicação (Clean Architecture)
```
┌──────────────────────────────────────────────┐
│         Presentation Layer                   │
│  - Controllers (REST API)                    │
│  - DTOs (validação de entrada/saída)        │
│  - Validators                                │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│         Application Layer                    │
│  - Use Cases (regras de negócio)            │
│  - Orquestração de operações                │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│         Domain Layer                         │
│  - Entities (Cliente, Veiculo, OS, etc)     │
│  - Value Objects (CPF, Email, Money, Placa) │
│  - Repository Interfaces                     │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│         Infrastructure Layer                 │
│  - TypeORM (implementação repositórios)     │
│  - PostgreSQL                                │
│  - JWT Auth                                  │
└──────────────────────────────────────────────┘
```

## Fluxo de Deploy
```
1. Desenvolvedor faz push para GitHub
   ↓
2. GitHub Actions é disparado
   ↓
3. Pipeline executa:
   - Build da aplicação
   - Execução de testes
   - Build da imagem Docker
   ↓
4. Deploy no Kubernetes:
   - Aplica manifestos YAML
   - Kubernetes cria/atualiza recursos
   ↓
5. Aplicação disponível via NodePort
```

## Escalabilidade

O HPA (Horizontal Pod Autoscaler) monitora:
- CPU: escala quando uso > 70%
- Memória: escala quando uso > 80%
- Min: 2 replicas
- Max: 10 replicas

## Recursos Kubernetes

- **Namespace**: oficina-mecanica (isolamento)
- **Deployments**: 2 (API e PostgreSQL)
- **Services**: 2 (NodePort e ClusterIP)
- **ConfigMaps**: 2 (app config e init-db)
- **Secrets**: 1 (senhas e tokens)
- **PVC**: 1 (armazenamento PostgreSQL)
- **HPA**: 1 (auto-scaling)
