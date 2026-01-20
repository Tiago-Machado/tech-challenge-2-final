#!/bin/bash

echo "Tech Challenge 2 - Script de Instalacao"
echo "========================================"
echo ""

verificar_comando() {
    if command -v $1 &> /dev/null; then
        echo "[OK] $1 ja esta instalado"
        return 0
    else
        echo "[INFO] $1 nao encontrado, instalando..."
        return 1
    fi
}

echo "[1/4] Verificando Docker..."
if ! verificar_comando docker; then
    echo "ERRO: Docker nao encontrado. Instale manualmente em https://docs.docker.com/get-docker/"
    exit 1
fi

echo ""
echo "[2/4] Verificando kubectl..."
if ! verificar_comando kubectl; then
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    rm kubectl
    echo "[OK] kubectl instalado com sucesso"
fi

echo ""
echo "[3/4] Verificando Minikube..."
if ! verificar_comando minikube; then
    curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
    sudo install minikube-linux-amd64 /usr/local/bin/minikube
    rm minikube-linux-amd64
    echo "[OK] Minikube instalado com sucesso"
fi

echo ""
echo "[4/4] Iniciando Minikube..."
if minikube status | grep -q "Running"; then
    echo "[OK] Minikube ja esta rodando"
else
    echo "Iniciando Minikube (pode demorar alguns minutos)..."
    minikube start --driver=docker
    echo "[OK] Minikube iniciado"
fi

echo ""
echo "========================================"
echo "Setup concluido com sucesso!"
echo "========================================"
echo ""
echo "Proximos passos:"
echo "  1. Docker Compose: docker-compose up -d"
echo "  2. Kubernetes: kubectl apply -f k8s/"
echo "  3. Terraform: cd terraform && terraform init"
echo ""
