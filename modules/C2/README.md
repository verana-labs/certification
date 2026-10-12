---
code: C2
title: The Verana Public Registry
hours: 4
assessment: exam
version: 1.0
status: published
summary: Corporations, Ecosystems, credential schemas, the participant tree, onboarding processes, sessions, fees and trust deposits.
---

# C2. The Verana Public Registry

Core module of every track. Four class hours, or a day of self-study. Assessed by a knowledge exam.

## Learning objectives

After this module you can:

1. Say what the registry records and what it deliberately does not, and name the Verana network as one Verifiable Public Registry among possible others.
2. Explain the Corporation: a group of accounts with a decision policy, its operators and its fee grants.
3. Describe an Ecosystem, its governance framework digest and its credential schemas, and relate it to what other communities call a trust registry.
4. Read a credential schema entry: JSON Schema, onboarding modes per role, validity periods, pricing asset, digest algorithm, and what is immutable.
5. Read a participant tree: the six roles, a participant entry, effective windows, and why the audience says accreditation.
6. Walk through an onboarding process from the applicant's start to the validator's validation, and name the three onboarding modes for issuers and verifiers and the two for holders.
7. Explain the three fees, who pays whom along the tree, the three pricing assets, and what a session is.
8. Explain what a trust deposit is, how it grows, why it cannot be withdrawn, and who can slash it.

## Prerequisites

Module C1.

---

## 1. What the registry is, and is not

The Verifiable Public Registry (VPR) is the public ledger of Verifiable Trust. It records:

- **Ecosystems**, their governance frameworks and their credential schemas.
- **Participants**: who is accredited, for which schema, in which role, by whom, from when to when.
- **Trust deposits** and the business model that moves fees along the participant tree.
- **Digests**: content hashes anchored with a block time, so a document or a credential has an objective existence date.

It does not record credentials, personal data, or the DID Documents of services. Credentials live in wallets and on the DIDs of services; the registry only says who was accredited to issue and verify them.

The **Verana network** is one Verifiable Public Registry: a public, permissionless network of validators built on the Cosmos SDK, with a test network for development and a main network for production. The specification is written so that other networks can implement it. In this program, "the registry" means the Verana network of the day: the test network until the main network is available.

Two words translate between the protocol and its audience and you will use both:

| The audience says | The protocol says |
|---|---|
| trust registry | ecosystem |
| accreditation | participant entry (or participant) |

## 2. Corporations

The actor of the registry is the **Corporation**: a legal or organizational entity, realized on chain as a group of accounts with a decision policy. The group's policy address is the Corporation's signature: it signs through proposals voted by the group members, or through **operators**.

An **operator** is an account the Corporation has authorized to sign specific message types on its behalf. A Corporation typically authorizes its staff accounts for day-to-day actions, and its VS Agent's account for the few messages an agent needs: a **VS operator authorization** covers one participant entry and a fixed set of message types. Nearly every message of the registry is **delegable**, so it can be sent by an operator rather than by a group proposal.

A **fee grant** lets an operator or an agent pay transaction fees from the Corporation's account, bounded by message types, amounts and periods. The agent does not need its own funds.

A Corporation controls zero or more Ecosystems and owns zero or more participant entries. One DID has one owner Corporation; a DID cannot be claimed twice.

> In the playground, every demo organization is a Corporation with its own group and policy, and its VS Agent holds an operator authorization. Module T4 makes you create one.

## 3. Ecosystems

An **Ecosystem** is a registry entry controlled by a Corporation. It has:

- A **DID**, which is the DID the ecosystem uses to issue its VTJSCs (module C1, section 7) and the DID at which every trust resolution ends.
- An **Ecosystem governance framework (EGF)**: the versioned documents that state the rules of the ecosystem. Who may join, how, at what price, what is slashed. Only its digest is on chain; the document is published by the ecosystem.
- **Credential schemas** (section 4), each with its own participant tree.

On every network one ecosystem, the ECS ecosystem, publishes the five Essential Credential Schemas. It is the trust root of Proof-of-Trust. Every other ecosystem is a domain: a chamber of commerce, a university network, an exchange consortium, a certification program.

Controlling an Ecosystem means two things in practice: signing its transactions as its Corporation, and controlling its DID so that the ecosystem can issue VTJSCs and can itself be a trusted Verifiable Service.

## 4. Credential schemas

A **credential schema** is a registry entry owned by an Ecosystem: a JSON Schema plus the policy that governs it.

**The JSON Schema** is draft 2020-12. Its `credentialSubject` lists the claims; its `title` becomes the credential name in wallets; its `$id` uses placeholders for the chain id and the schema id, which the registry fills in. Credentials issued to services carry the subject DID in an `id` claim; credentials issued to people carry no subject DID.

**The policy** is set at creation:

| Setting | Options | What it decides |
|---|---|---|
| Issuer onboarding mode | `OPEN`, `ECOSYSTEM_ONBOARDING_PROCESS`, `GRANTOR_ONBOARDING_PROCESS` | Who may issue, and who validates them |
| Verifier onboarding mode | same three | Who may ask people for this credential |
| Holder onboarding mode | `ISSUER_ONBOARDING_PROCESS`, `PERMISSIONLESS` | Whether each holder has a participant entry the issuer can revoke |
| Validity periods | days per role, zero for none | How often grantors, issuers, verifiers and holders must renew |
| Pricing asset | the native coin or another on-chain coin, trust units, fiat | The unit of every fee on this schema |
| Digest algorithm | SHA-384 or SHA-512 | How public credentials of this schema are anchored |

**Immutability.** Everything except the validity periods is immutable once created. A schema whose JSON or modes need to change is a new schema, with a new participant tree. This is deliberate: a credential that references a schema must mean the same thing for its whole life.

When a schema is anchored, the registry also publishes what the formats need: the VTJSC on the ecosystem DID, the type metadata for SD-JWT, and the AnonCreds schema.

## 5. The participant tree

Each schema has a **participant tree**: the chain of validators that leads from the ecosystem to every accredited issuer, verifier and holder.

| Role | Who | Validated by |
|---|---|---|
| `ECOSYSTEM` | The root entry, held by the ecosystem's own DID | Nobody; created by the ecosystem |
| `ISSUER_GRANTOR` | An operator accredited to onboard issuers in its branch | The root |
| `VERIFIER_GRANTOR` | An operator accredited to onboard verifiers in its branch | The root |
| `ISSUER` | A service accredited to issue the credential | The root, or an issuer grantor, or nobody when the mode is `OPEN` |
| `VERIFIER` | A service accredited to request the credential | The root, or a verifier grantor, or nobody when the mode is `OPEN` |
| `HOLDER` | A holder of the credential, when the holder mode requires an entry | The issuer |

A **participant entry** records the Corporation, the DID, the schema, the role, the validator, the **effective window** (from and until), the fees charged at this node, the onboarding state and the deposit. An entry is **active** when its window contains now and it is neither revoked nor slashed. Only active entries count in trust resolution, and an accreditation is checked at the time the credential was issued, not at the time it is presented.

Grantors exist so that an ecosystem does not validate every applicant itself. A national ecosystem can accredit one issuer grantor per region; each grantor validates the issuers in its branch and sets its own fees.

The root entry is created by the ecosystem with the fees the ecosystem charges. Without a root, nobody can join a schema whose modes require validation.

## 6. Onboarding processes

An **onboarding process** is how a pending participant entry becomes a validated one. Two parties take part: the **applicant**, the Corporation that wants the accreditation, and the **validator**, the participant that may grant it (the root, a grantor, or an issuer for holders).

1. **Start, on chain.** The applicant sends a message that creates a pending entry for the schema and role, names the validator, and pays the validator's validation fee into escrow.
2. **Evidence, off chain.** The applicant and the validator exchange what the governance framework requires over vt-flow between their agents: documents, proofs, a signed form, whatever the ecosystem decided. The registry does not see it.
3. **Validation, on chain.** The validator sends the validating message with the effective window, the fees the new participant will charge, and optionally a discount. The escrowed fee is released; the entry becomes active at the start of its window.

The validator may refuse, in which case the escrow is returned. A validated entry can later be revoked by its validator or ended by its owner; its history remains.

The onboarding modes of section 4 select the validator:

- `OPEN`: no process. The participant creates its own entry and is active at once. Right when anyone may describe themselves, or when anyone may verify a low-sensitivity credential.
- `ECOSYSTEM_ONBOARDING_PROCESS`: the root validates.
- `GRANTOR_ONBOARDING_PROCESS`: a grantor validates.
- For holders, `ISSUER_ONBOARDING_PROCESS` gives each holder an entry the issuer validates and can revoke; `PERMISSIONLESS` gives holders no entry, which is normal for credentials issued to people.

Renewal is an onboarding process too: when a validity period expires, the participant applies again to its validator.

## 7. Fees, pricing assets and sessions

Fees are set on accreditations, not on the ecosystem. The root sets what the ecosystem charges, each grantor what it charges in its branch, each issuer what it charges holders and verifiers of its credentials. The registry sums them along the tree at payment time.

| Fee | Set on | Paid by | When |
|---|---|---|---|
| **Validation** | The validator's entry | The applicant | At the start of an onboarding process, released on validation |
| **Issuance** | Every entry above the issuer | The issuer | Per credential issued |
| **Verification** | Every entry above the verifier, plus the issuer of the credential | The verifier | Per credential verified |

Validators may grant a discount on issuance and verification fees to an applicant when validating it. Zero is a valid fee.

A **participant session** is the on-chain record of one issuance or one verification. It is what triggers pay-per-issuance and pay-per-verification: the issuer's or verifier's agent opens the session, the registry computes the beneficiaries along the tree and moves the fees.

The schema fixes the **pricing asset** of all its fees:

| Asset | What it is | Settlement |
|---|---|---|
| `COIN` | The native coin of the network, or another on-chain coin | On chain, at once |
| `TU` | Trust units: a value-stable unit of account, converted to the native coin at transaction time through a governance-owned exchange rate | On chain, at once |
| `FIAT` | A fiat currency | The obligation is recorded on chain; payment happens off chain |

Trust units protect an ecosystem against coin price swings. Fiat lets an ecosystem price in its own currency and invoice. Trust deposits are always in the native coin whatever the pricing asset.

## 8. Trust deposits

Every Corporation has a **trust deposit**. It is not a payment: it is a stake.

- It **grows** with activity. A network-defined share of every fee paid is added to the payer's deposit, and a share of every fee received is added to the recipient's deposit. So a fee of 15 costs the payer about 18.75 at today's rates, and leaves the recipient with 95 percent liquid.
- It **cannot be withdrawn** in v4. The deposit is the cost of being present in the network.
- It **can be slashed**: by an ecosystem, for a breach of its governance framework by one of its participants, and by network governance, for a breach of the network's rules. Slashing is the enforcement mechanism behind every accreditation: an accredited issuer that misbehaves loses money, not only its entry.

This is why participants have skin in the game and why the registry can be permissionless without being worthless: anyone may join, and everyone who joins has something to lose. Module C3 covers slashing rules in governance frameworks; module B5 covers the economics.

## 9. Digests and anchoring

The registry anchors **digests**: a content hash with the block time of its anchoring. Two uses matter here.

- A **public credential** such as a linked presentation is anchored, which gives it an objective issuance time. Trust resolution uses that time to check the issuer's accreditation at issuance.
- A **governance framework** is anchored, so that anyone can prove which version of the rules was in force when.

The digest algorithm of a schema (SHA-384 or SHA-512) is the one used to anchor credentials of that schema.

## 10. Reading the registry

You read the registry through the **indexer**, the service that replays the chain, resolves DIDs, evaluates trust and serves queries. In v4 the indexer also performs trust resolution (module C1, section 7) and serves the ToIP Trust Registry Query Protocol (TRQP), so that other trust frameworks can ask authorization and recognition questions in a standard way.

| Surface | What it is for |
|---|---|
| **Indexer API** | Entities (ecosystems, schemas, participants, sessions), trust resolution, TRQP |
| **Trust graph** | Faceted search and traversal over DIDs, ecosystems, corporations, schemas and endpoints |
| **Frontend** | Browse and, for a Corporation's operators, act: create ecosystems and schemas, validate applicants, see pending tasks |
| **CLI** (`veranad`) | Everything, from a terminal, for operators and validators |

Module C4 makes you query the indexer. Module T4 makes you act through the frontend and the CLI.

## Key takeaways

- The registry records accreditations, deposits and digests, never credentials or personal data.
- Corporation: a group with a policy, acting through proposals or operators; one owner per DID.
- Ecosystem: a DID, a governance framework digest, schemas; the ECS ecosystem is the trust root.
- Schema: JSON Schema plus policy; immutable except validity periods; modes decide who validates whom.
- Participant tree: root, grantors, issuers, verifiers, holders; active entries only; checked at issuance time.
- Onboarding process: on-chain start with escrow, off-chain evidence, on-chain validation.
- Three fees summed along the tree, three pricing assets, sessions trigger payment.
- Trust deposit: grows with every fee, never withdrawn in v4, slashed by the ecosystem or by governance.

## Self-check

1. An ecosystem wants only vetted hospitals to issue a credential but anyone to be able to verify it. Which issuer and verifier modes does it choose?
2. A grantor validated an issuer with a window that ended in June. A credential that issuer issued in May is presented in September. Does the accreditation check pass?
3. Who pays the verification fee, and to whom does the registry distribute it?
4. Why can a schema's JSON not be edited after creation, while its validity periods can?
5. An issuer sets its issuance fee to zero. Does the issuer's trust deposit still grow when it issues?
6. Name two things that are anchored as digests and what each anchoring proves.
7. A Corporation wants its VS Agent to open sessions without holding coins. Which two authorizations does it give the agent's account?

## Reading list

- Verifiable Public Registry specification v4: Introduction; Corporations; Ecosystems; Credential schemas and participants; Onboarding processes; Participant sessions; Trust deposits; Business models; Exchange rates.
- docs.verana.io: Understand, Network; Understand, Ecosystems (the business model); Build, Ecosystems (define a credential schema; root participants and grantors; validate applicants; design the fee model); Reference, Glossary.

## Assessment

Knowledge exam on the Foundation platform: scenario-based multiple choice drawn from the Level 1 bank, sixty minutes, pass mark seventy percent. This module's questions also enter the Level 1 Fundamentals exam together with C1 and C4.
