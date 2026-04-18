# Superpowers Workflow

> Methodologie de developpement agentique : brainstorm → design → plan → implement (TDD) → review → ship.

**Principe fondamental :** Les agents qui designent avant de coder produisent de meilleurs resultats que ceux qui sautent directement dans le code.

## Workflow

```
User request
    │
    ▼
┌─────────────────────┐
│  1. BRAINSTORMING    │  ← Comprendre, explorer, valider le design
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  2. WRITING PLAN     │  ← Taches bite-sized (2-5 min), fichiers exacts, TDD
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  3. IMPLEMENTATION   │  ← RED-GREEN-REFACTOR par tache
└────────┬────────────┘
         ▼
┌─────────────────────┐
│  4. REVIEW & SHIP    │  ← Code review, verification, merge/PR
└─────────────────────┘
```

**Regle cardinale :** Pas de code sans design. Pas d'implementation sans plan. Pas de claim de completion sans evidence de verification.

## Phase 1: Brainstorming

**Hard gate :** NE PAS ecrire de code avant approbation du design par l'utilisateur.

1. Explorer le contexte projet (fichiers, docs, commits recents)
2. Poser des questions de clarification (une a la fois, preferer le choix multiple)
3. Proposer 2-3 approches avec trade-offs et recommandation
4. Presenter le design par sections, obtenir l'approbation
5. Sauvegarder le spec dans `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
6. Self-review du spec (placeholders, contradictions, ambiguite)

Principes : YAGNI, design for isolation, suivre les patterns existants.

## Phase 2: Plan

Chaque tache = une action (2-5 min) :
- "Write the failing test"
- "Run it to make sure it fails"
- "Implement the minimal code"
- "Run tests to make sure they pass"
- "Commit"

**Pas de placeholders** : "TBD", "TODO", "implement later", "Similar to Task N" sont des echecs de planning.

Sauvegarder dans `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`

## Phase 3: Implementation — TDD

**Loi d'airain : Pas de code de production sans test echouant d'abord.**

### Cycle RED-GREEN-REFACTOR

```
RED ──► Verifier echec ──► GREEN ──► Verifier succes ──► REFACTOR ──► Next
```

- **RED** : Un comportement par test. Le lancer. Confirmer qu'il echoue pour la bonne raison.
- **GREEN** : Code minimal pour passer le test. Rien de plus.
- **REFACTOR** : Enlever la duplication, ameliorer les noms. Tests toujours verts.

## Phase 4: Debugging Systematique

**Loi d'airain : Pas de fix sans investigation de la cause racine.**

1. **Investigation** : Lire les erreurs, reproduire, tracer le flux de donnees
2. **Analyse de patterns** : Trouver des exemples fonctionnels similaires, comparer
3. **Hypothese & Test** : Une hypothese claire, tester avec le plus petit changement possible
4. **Implementation** : Test echouant d'abord (TDD), fix unique, verifier

**Red flags (= STOP, retourner phase 1) :**
- "Quick fix for now"
- "Just try changing X"
- "I don't fully understand but this might work"

## Verification avant completion

1. Identifier la commande qui prouve le claim
2. L'executer (fresh, complet)
3. Lire le output entier, verifier exit code
4. Seulement alors faire le claim AVEC evidence
