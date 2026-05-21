# Dra. Rebeca Moura

Landing page em Next.js para médica dermatologista, com rota principal e página de links para bio do Instagram.

## Rodar localmente

```bash
npm install
npm run dev
```

## Conteúdo editável

Os textos, links, CRM, RQE, WhatsApp, endereço, procedimentos e depoimentos ficam em:

```txt
app/content.ts
```

Antes de publicar, substitua:

- `CRM UF 000000`
- `RQE 000000`
- `https://wa.me/5500000000000`
- `https://instagram.com/`
- endereço do consultório
- procedimentos reais
- depoimentos reais autorizados

## Foto

A imagem atual é provisória:

```txt
public/rebeca-portrait.svg
```

Quando tiver a foto em alta, coloque o arquivo em `public/` e atualize `doctor.portrait` em `app/content.ts`.
