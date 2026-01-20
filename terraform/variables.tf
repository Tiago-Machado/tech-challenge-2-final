variable "cluster_name" {
  description = "Nome do cluster Kubernetes"
  type        = string
  default     = "oficina-cluster"
}

variable "namespace" {
  description = "Namespace da aplicacao"
  type        = string
  default     = "oficina"
}

variable "app_name" {
  description = "Nome da aplicacao"
  type        = string
  default     = "oficina-api"
}

variable "app_image" {
  description = "Imagem Docker da aplicacao"
  type        = string
  default     = "oficina-mecanica-api:latest"
}

variable "app_replicas" {
  description = "Numero de replicas da aplicacao"
  type        = number
  default     = 2
}

variable "db_name" {
  description = "Nome do banco de dados"
  type        = string
  default     = "oficina_mecanica"
}

variable "db_username" {
  description = "Usuario do banco de dados"
  type        = string
  default     = "oficina"
}

variable "db_password" {
  description = "Senha do banco de dados"
  type        = string
  sensitive   = true
  default     = "oficina123"
}

variable "jwt_secret" {
  description = "Secret para JWT"
  type        = string
  sensitive   = true
  default     = "oficina-mecanica-super-secret-key-2026"
}
