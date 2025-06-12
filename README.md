# AWS Mentoring - Load Balancer Demo

Esta aplicação Node.js/Express exibe em qual zona de disponibilidade da AWS a instância está hospedada.

## Como usar

1. Faça deploy desta aplicação em uma instância EC2 na AWS.
2. Acesse o endereço da instância pelo navegador.
3. A página mostrará: `disponível em <zona da aws>` (ex: us-east-1a).

## Rodando localmente

```bash
npm install
node index.js
```

> Localmente, a zona será exibida como "zona desconhecida".

---

**Demonstração para fins educacionais do curso de AWS.**
