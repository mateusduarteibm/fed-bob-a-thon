# fed-bob-a-thon

Frontend Angular 17 do hackathon, com landing page moderna para exibição de cursos consumindo a API:

- Base URL: `http://bff-bob-a-thon-env.eba-kipvpqnj.us-east-1.elasticbeanstalk.com/api`
- Endpoint utilizado no frontend: `GET /contents`

## Executar localmente

```bash
npm install
npm start
```

A aplicação ficará disponível em:

```bash
http://localhost:4200/
```

## Build

```bash
npm run build
```

Saída gerada em:

```bash
dist/fed-bob-a-thon-app/browser
```

## Deploy no GitHub Pages

O projeto já está configurado com workflow em:

```bash
.github/workflows/deploy-pages.yml
```

Esse workflow:
- executa em push na branch `main`
- faz build do Angular com `--base-href "/fed-bob-a-thon/"`
- publica automaticamente no GitHub Pages

## Como habilitar no GitHub

No repositório `fed-bob-a-thon`:

1. Acesse **Settings**
2. Vá em **Pages**
3. Em **Source**, selecione **GitHub Actions**

Depois disso, basta fazer push na `main`.

## URL esperada de publicação

Se o dono do repositório for, por exemplo, `mateus`, a URL será:

```bash
https://mateus.github.io/fed-bob-a-thon/
```

## Observações

- Como o deploy está em subpath no GitHub Pages, o `base-href` já foi ajustado no workflow.
- Se o nome do repositório mudar, será necessário atualizar `"/fed-bob-a-thon/"` no workflow.
