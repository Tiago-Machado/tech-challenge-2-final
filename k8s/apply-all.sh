#!/bin/bash
echo "Aplicando manifestos Kubernetes..."

kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f postgres-pvc.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
kubectl apply -f hpa.yaml

echo "Manifestos aplicados!"
echo ""
echo "Verificando status..."
kubectl get all -n oficina
