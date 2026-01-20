output "namespace" {
  description = "Namespace criado"
  value       = kubernetes_namespace.oficina.metadata[0].name
}

output "app_service_url" {
  description = "URL do servico da aplicacao"
  value       = "http://localhost:30000"
}

output "postgres_service" {
  description = "Nome do servico PostgreSQL"
  value       = kubernetes_service.postgres.metadata[0].name
}

output "hpa_status" {
  description = "Status do HPA"
  value       = "kubectl get hpa ${var.app_name}-hpa -n ${var.namespace}"
}
