# Kubernetes Deployment - Oficina Mecanica API

## Pre-requisitos

- Docker instalado
- kubectl instalado
- kind instalado (ou qualquer cluster Kubernetes)

## Deploy Rapido

### 1. Criar cluster local (kind)
```bash
kind create cluster --name oficina-cluster
```

### 2. Build e carregar imagem
```bash
# Na raiz do projeto
docker build -t oficina-mecanica-api:latest .
kind load docker-image oficina-mecanica-api:latest --name oficina-cluster
```

### 3. Deploy completo
```bash
cd k8s
./apply-all.sh
```

### 4. Instalar metrics-server (para HPA funcionar)
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl patch deployment metrics-server -n kube-system --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--kubelet-insecure-tls"}]'
```

### 5. Verificar deployment
```bash
kubectl get all -n oficina
kubectl get hpa -n oficina
```

### 6. Acessar aplicacao
```bash
kubectl port-forward svc/oficina-api-service 3000:3000 -n oficina
```

Acesse: http://localhost:3000/api/docs

## Testar Auto-Scaling (HPA)

### Gerar carga
```bash
# Terminal 1: Monitorar HPA
kubectl get hpa -n oficina -w

# Terminal 2: Gerar carga
ab -n 100000 -c 500 http://localhost:3000/api/v1/health
```

Observe as replicas aumentando de 2 para 3, 4, 5... conforme a CPU sobe acima de 70%.

## Arquitetura

- **Namespace:** oficina
- **Deployments:** 
  - oficina-api (2-10 replicas com HPA)
  - oficina-postgres (1 replica)
- **Services:**
  - oficina-api-service (NodePort 30000)
  - oficina-postgres-service (ClusterIP)
- **ConfigMap:** oficina-config (variaveis de ambiente)
- **Secret:** oficina-secret (senhas)
- **PVC:** postgres-pvc (1Gi de storage)
- **HPA:** Auto-scaling baseado em CPU (70%) e Memory (80%)

## Recursos Configurados

### API Pods
- **Requests:** 256Mi RAM, 200m CPU
- **Limits:** 512Mi RAM, 500m CPU
- **Health checks:** liveness e readiness probes

### PostgreSQL
- **Requests:** 256Mi RAM, 250m CPU
- **Limits:** 512Mi RAM, 500m CPU
- **Storage:** 1Gi persistente

## Limpeza
```bash
# Deletar namespace (remove tudo)
kubectl delete namespace oficina

# OU deletar cluster inteiro
kind delete cluster --name oficina-cluster
```
