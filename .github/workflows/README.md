# CI/CD Pipeline - GitHub Actions

Pipeline automatizado para build, test e deploy da aplicacao Oficina Mecanica API.

## Workflows

### CI/CD Pipeline (`ci-cd.yml`)

Pipeline principal executado em push/PR para master/main.

**Jobs:**

1. **build-and-test**
   - Checkout do codigo
   - Setup Node.js 20.x
   - Instalacao de dependencias
   - Lint (se configurado)
   - Testes (se configurados)
   - Build da aplicacao
   - Upload de artifacts

2. **docker-build**
   - Build da imagem Docker
   - Sem push (apenas validacao)
   - Cache otimizado com GitHub Actions cache

3. **security-scan**
   - npm audit para vulnerabilidades
   - Geracao de relatorio JSON
   - Upload do relatorio (30 dias)

4. **terraform-validate**
   - Validacao de formato (terraform fmt)
   - Terraform init
   - Terraform validate

5. **kubernetes-validate**
   - Validacao de manifestos K8s com kubeval
   - Verifica todos os arquivos em k8s/

## Triggers

- Push para `master` ou `main`
- Pull Request para `master` ou `main`

## Artifacts

- **dist**: Build da aplicacao (1 dia)
- **security-report**: Relatorio npm audit (30 dias)

## Proximos Passos

- [ ] Adicionar testes unitarios (Jest)
- [ ] Adicionar testes E2E
- [ ] Deploy automatico em ambiente de staging
- [ ] Integracao com Docker Hub/GitHub Registry
- [ ] Notificacoes (Slack/Discord)

## Visualizar Execucoes

https://github.com/Tiago-Machado/oficina-mecanica-api/actions
