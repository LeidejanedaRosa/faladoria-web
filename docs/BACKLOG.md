# Backlog

Trabalho planejado e questões de negócio ainda sem resposta. Quando uma questão é decidida, ela
sai daqui e vira uma entrada em [DECISIONS.md](DECISIONS.md).

---

## Questões de negócio em aberto

### Equipe: o que acontece com as cidades quando uma conta vira administração?

**Registrada em**: 2026-10-28 · **Bloqueia**: edição de conta (PR 2 da Equipe, issue #12)

**Contexto**: a administração vê todas as cidades, então não escolhe cidade. Na criação isso já
está resolvido: o formulário envia `assignedCities: []` para `admin`. Na edição, a conta já tem
cidades. A API (`POST /api/users/:id/update`) não decide nada: grava a lista que receber,
qualquer que seja o papel.

**Caso**: uma assistente de Varginha e Lavras passa para administração e a mudança é salva.

| Opção   | O que a tela envia                  | Consequência                                                                                                                  |
| ------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Apagar  | `role: 'admin', assignedCities: []` | Dado coerente com o papel. Se ela voltar a ser assistente, as cidades são escolhidas de novo.                                 |
| Guardar | só `role: 'admin'`                  | As cidades ficam gravadas, mas sem efeito. Se ela voltar a ser assistente, as cidades voltam junto, talvez já desatualizadas. |

**Para pensar antes de decidir**:

- Trocar de papel e depois voltar ao antigo é comum (uma substituição temporária, por exemplo)?
- Cidade guardada sem efeito pode confundir quem lê a conta ou o banco depois?
- Uma cidade guardada pode ter deixado de ser atendida. Na volta, a API recusaria o salvamento
  (`ASSIGNED_CITY_NOT_SERVED`).
