resource "kubernetes_config_map" "app_config" {
  metadata {
    name      = "${var.app_name}-config"
    namespace = kubernetes_namespace.oficina.metadata[0].name
  }

  data = {
    NODE_ENV    = "production"
    DB_HOST     = "${var.app_name}-postgres-service"
    DB_PORT     = "5432"
    DB_DATABASE = var.db_name
    DB_USERNAME = var.db_username
    PORT        = "3000"
  }
}
