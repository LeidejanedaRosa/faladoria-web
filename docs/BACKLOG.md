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
