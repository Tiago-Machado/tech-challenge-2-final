resource "kubernetes_service" "postgres" {
  metadata {
    name      = "${var.app_name}-postgres-service"
    namespace = kubernetes_namespace.oficina.metadata[0].name
  }

  spec {
    selector = {
      app = "postgres"
    }

    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP"
  }
}
