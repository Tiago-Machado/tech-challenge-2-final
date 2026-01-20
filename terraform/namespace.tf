resource "kubernetes_namespace" "oficina" {
  metadata {
    name = var.namespace
    
    labels = {
      name        = var.namespace
      environment = "production"
      managed-by  = "terraform"
    }
  }
}
