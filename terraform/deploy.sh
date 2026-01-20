#!/bin/bash

echo "Iniciando deploy com Terraform..."

# Verificar se cluster existe
if ! kubectl cluster-info > /dev/null 2>&1; then
    echo "Erro: Cluster Kubernetes nao encontrado!"
    echo "Execute: kind create cluster --name oficina-cluster"
    exit 1
fi

# Verificar se imagem existe
if ! docker image inspect oficina-mecanica-api:latest > /dev/null 2>&1; then
    echo "Erro: Imagem Docker nao encontrada!"
    echo "Execute: docker build -t oficina-mecanica-api:latest ."
    exit 1
fi

# Carregar imagem no kind (se estiver usando kind)
if command -v kind > /dev/null 2>&1; then
    echo "Carregando imagem no kind..."
    kind load docker-image oficina-mecanica-api:latest --name oficina-cluster
fi

# Terraform init
echo "Inicializando Terraform..."
terraform init

# Terraform plan
echo "Planejando deploy..."
terraform plan -out=tfplan

# Terraform apply
echo "Aplicando infraestrutura..."
terraform apply tfplan

# Verificar deploy
echo ""
echo "Verificando deploy..."
kubectl get all -n oficina
kubectl get hpa -n oficina

echo ""
echo "Deploy concluido!"
echo ""
echo "Para acessar a aplicacao:"
echo "  kubectl port-forward svc/oficina-api-service 3000:3000 -n oficina"
echo ""
echo "Swagger UI: http://localhost:3000/api/docs"
