# Backlog

Trabalho planejado e questões de negócio ainda sem resposta. Quando uma questão é decidida, ela
sai daqui e vira uma entrada em [DECISIONS.md](DECISIONS.md).

---

## Questões de negócio em aberto

Nenhuma no momento.

## Trabalho planejado

- **Visual delicado nos controles do painel** (branch própria, depois do drawer). O protótipo
  aprovado pede, no desktop, texto de 14px e controles de 38 a 40px. As abas do drawer já seguem
  isso, mas os campos compartilhados (`TextField`, `PasswordField`, `SelectField`, `Combobox`,
  `Button`, os radios do papel) têm 16px e 48px em todas as telas, e o formulário do drawer fica
  mais pesado que o resto. No celular continuam 16px e 48px (zoom do iOS e alvo de toque, WCAG
  2.2). Afeta todos os formulários do painel, inclusive login e cidades.

- **Filtros das contas quando as listas crescerem** (sem data; gatilho: centenas de contas numa
  pasta). Duas mudanças juntas:
  - **Backend primeiro**: hoje `GET /api/users` carrega todas as contas e filtra na memória do
    servidor, só por papel e cidade. Para escalar, precisaria filtrar no banco, aceitar estado
    sozinho e busca por nome ou e-mail, incluir as admins em qualquer cidade e paginar. Só então o
    painel passa o filtro para a API.
  - **No celular**, os filtros vão para trás de um botão "Filtrar", para a lista não começar 250px
    abaixo.

  Ver DECISIONS (2026-11-21, filtros).
