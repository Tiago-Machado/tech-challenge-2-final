# Terraform - Oficina Mecanica API

Infrastructure as Code para deploy do sistema de gerenciamento de oficina mecanica no Kubernetes.

## Pre-requisitos

- Terraform >= 1.0
- kubectl instalado e configurado
- Cluster Kubernetes rodando (kind, minikube, EKS, GKE, AKS, etc)
- Docker para build da imagem

## Recursos Provisionados

- Namespace: oficina
- ConfigMap: variaveis de ambiente
- Secret: senhas e tokens
- PostgreSQL:
  - Deployment (1 replica)
  - Service (ClusterIP)
  - PVC (1Gi)
- Aplicacao:
  - Deployment (2-10 replicas)
  - Service (NodePort 30000)
  - HPA (auto-scaling)

## Deploy Completo

### 1. Criar cluster local (opcional)
```bash
# 13. README do Terraform
cat > terraform/README.md << 'EOF'
# Terraform - Oficina Mecanica API

Infrastructure as Code para deploy do sistema de gerenciamento de oficina mecanica no Kubernetes.

## Pre-requisitos

- Terraform >= 1.0
- kubectl instalado e configurado
- Cluster Kubernetes rodando (kind, minikube, EKS, GKE, AKS, etc)
- Docker para build da imagem

## Recursos Provisionados

- Namespace: oficina
- ConfigMap: variaveis de ambiente
- Secret: senhas e tokens
- PostgreSQL:
  - Deployment (1 replica)
  - Service (ClusterIP)
  - PVC (1Gi)
- Aplicacao:
  - Deployment (2-10 replicas)
  - Service (NodePort 30000)
  - HPA (auto-scaling)

## Deploy Completo

### 1. Criar cluster local (opcional)
```bash
kind create cluster --name oficina-cluster
```

### 2. Build e carregar imagem
```bash
cd ..
docker build -t oficina-mecanica-api:latest .
kind load docker-image oficina-mecanica-api:latest --name oficina-cluster
```

### 3. Inicializar Terraform
```bash
cd terraform
terraform init
```

### 4. Planejar deploy
```bash
terraform plan
```

### 5. Aplicar infraestrutura
```bash
terraform apply
```

Digite `yes` quando solicitado.

### 6. Verificar deploy
```bash
kubectl get all -n oficina
kubectl get hpa -n oficina
```

### 7. Acessar aplicacao
```bash
kubectl port-forward svc/oficina-api-service 3000:3000 -n oficina
```

Acesse: http://localhost:3000/api/docs

## Customizacao

### Modificar variaveis

Crie arquivo `terraform.tfvars`:
```hcl
cluster_name  = "meu-cluster"
namespace     = "producao"
app_replicas  = 3
db_password   = "senha-super-segura"
jwt_secret    = "meu-jwt-secret"
```

Aplique:
```bash
terraform apply -var-file="terraform.tfvars"
```

### Modificar recursos

Edite os arquivos `.tf` e execute:
```bash
terraform plan
terraform apply
```

## Outputs

Apos aplicar, o Terraform exibe:

- Namespace criado
- URL do servico
- Comando para verificar HPA
- Nome do servico PostgreSQL

## Remover Infraestrutura
```bash
terraform destroy
```

## Estrutura de Arquivos
```
terraform/
├── versions.tf              # Providers e versoes
├── variables.tf             # Variaveis de entrada
├── outputs.tf               # Outputs do Terraform
├── namespace.tf             # Namespace Kubernetes
├── configmap.tf             # ConfigMaps
├── secret.tf                # Secrets
├── postgres-pvc.tf          # PVC do PostgreSQL
├── postgres-deployment.tf   # Deployment PostgreSQL
├── postgres-service.tf      # Service PostgreSQL
├── app-deployment.tf        # Deployment da aplicacao
├── app-service.tf           # Service da aplicacao
├── hpa.tf                   # Horizontal Pod Autoscaler
└── README.md                # Este arquivo
```

## Troubleshooting

### Erro: Cluster nao encontrado
```bash
kubectl config current-context
kubectl cluster-info
```

### Erro: Imagem nao encontrada
```bash
kind load docker-image oficina-mecanica-api:latest --name oficina-cluster
```

### Verificar logs
```bash
kubectl logs -l app=oficina-api -n oficina
kubectl logs -l app=postgres -n oficina
```

### Reinstalar metrics-server (para HPA)
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl patch deployment metrics-server -n kube-system --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'
```
