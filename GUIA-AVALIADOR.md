# Guia para Avaliação do Projeto

Este documento contem instruçoes para facilitar a avaliação do projeto.

## Setup Rapido

Criei um script que instala todas as dependencias automaticamente. Basta executar:
```bash
chmod +x setup.sh
./setup.sh
```

O script vai instalar kubectl, Minikube e Terraform caso ainda nao estejam instalados.

## Formas de Validar o Projeto

Existem 3 formas de validar o projeto, escolha a que preferir:

### 1. Docker Compose (mais rapido)

Esta é a forma mais simples e rapida de validar se a aplicaçao funciona.
```bash
docker-compose up -d
```

Aguarde uns 30 segundos e teste:
```bash
curl http://localhost:3000/api/v1/health
```

Deve retornar algo como:
```json
{"status":"ok","timestamp":"...","service":"Oficina Mecânica API"}
```

Para listar clientes (vai retornar vazio no inicio):
```bash
curl http://localhost:3000/api/v1/clientes
```

### 2. Kubernetes

Para validar a infraestrutura no Kubernetes:
```bash
kubectl apply -f k8s/
```

Verifique se os pods estao rodando:
```bash
kubectl get pods -n oficina-mecanica
```

Deve aparecer algo assim:
```
NAME                                    READY   STATUS
oficina-mecanica-api-xxxxx              1/1     Running
oficina-mecanica-postgres-xxxxx         1/1     Running
```

Para acessar a API:
```bash
kubectl port-forward -n oficina-mecanica svc/oficina-mecanica-api-service 3000:3000
```

Depois pode testar normalmente com curl.

### 3. Terraform

Para validar a infraestrutura como codigo:
```bash
cd terraform
terraform init
terraform validate
```

O comando validate deve retornar "Success! The configuration is valid."

Para ver o que seria criado:
```bash
terraform plan
```

## Pontos de Avaliação

### Clean Architecture

O projeto segue clean architecture com separaçao clara de camadas:

- Entidades no domain/
- Casos de uso em application/
- Infraestrutura (banco, etc) em infrastructure/
- Controllers em presentation/

### Kubernetes

Os manifestos estao na pasta k8s/ e incluem:

- Namespace isolado
- Deployments para API e PostgreSQL
- Services (ClusterIP e NodePort)
- ConfigMaps para configuração
- Secrets para senhas
- HPA (auto-scaling)
- PersistentVolumeClaim para dados

### Terraform

A infraestrutura esta versionada em terraform/ usando providers do Kubernetes.

### CI/CD

O pipeline esta configurado no GitHub Actions e roda automaticamente a cada push.

## Troubleshooting

Se o Minikube nao iniciar:
```bash
minikube delete
minikube start --driver=docker
```

Se os pods ficarem em ImagePullBackOff:
```bash
eval $(minikube docker-env)
docker build -t oficina-mecanica-api:latest .
kubectl rollout restart deployment oficina-mecanica-api -n oficina-mecanica
```

## Observações

O projeto esta completo e funcional. Todos os requisitos do Tech Challenge foram implementados.

Qualquer duvida pode entrar em contato.
