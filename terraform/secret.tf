resource "kubernetes_secret" "app_secret" {
  metadata {
    name      = "${var.app_name}-secret"
    namespace = kubernetes_namespace.oficina.metadata[0].name
  }

  data = {
    DB_PASSWORD = base64encode(var.db_password)
    JWT_SECRET  = base64encode(var.jwt_secret)
  }

  type = "Opaque"
}
