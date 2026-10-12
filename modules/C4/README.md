---
code: C4
title: Playground practicum
hours: 3
assessment: lab
version: 1.0
status: published
summary: Run the demos with a wallet, read a Proof-of-Trust, resolve a DID on the indexer, read a participant tree.
---

# C4. Playground practicum

Core module of every track. Three hours, hands-on. Assessed by a lab report.

The Verana Playground (playground.testnet.verana.network) runs demo organizations, services and use cases against the Verana test network, with real wallets. This module makes you touch everything C1 and C2 described: connect with a wallet, read a Proof-of-Trust, accept an offer and share a credential with the verdicts in front of you, then look at the same facts from the registry side through the indexer.

## Learning objectives

After this module you can:

1. Install a listed wallet, connect it to a playground service and read the five blocks of its Proof-of-Trust.
2. Accept a credential offer and share a presentation, reading the Q2 and Q3 verdicts, and recognize a refusal.
3. Resolve a service DID on the indexer and explain the `trusted` verdict from the response.
4. Find the schema and the participant tree behind a credential, and identify the root, the validator and the issuer.
5. Narrate one playground use case as a sequence of the three questions.

## Prerequisites

Modules C1 and C2. A smartphone, or a desktop browser for the web wallets. Internet access to the test network. No account is needed on the playground.

## Before you start

- Everything runs on the **Verana test network**. Credentials issued here are demonstration credentials and the wallets show a network chip saying so.
- The indexer of the test network is `https://idx.testnet.verana.network`. Its `/v4` routes are used below.
- Keep a text file open: the lab report (section "Deliverable") is built from the values you collect as you go.

---

## Exercise 1. Pick a wallet and read its status (15 min)

Open the playground's **Personal wallets** page. It lists the wallets that integrate Verifiable Trust, with two columns you need to understand:

- **Status**: whether the wallet is listed as live, in progress or planned against the current network.
- **Trust screen**: whether the wallet renders the Proof-of-Trust and gates offers and requests on the verdicts. This is the Verifiable User Agent behavior of C1, section 5.

Install a wallet that is live and has a trust screen. Hologram is the reference; any listed wallet with a trust screen works for this lab.

Record: the wallet name and version, and its status row as displayed.

## Exercise 2. Connect to a service and read the Proof-of-Trust (30 min)

Open the generic demo service of the playground (the Vesta demo) and scan its connection QR code with the wallet. Before the connection is established the wallet shows the Proof-of-Trust. Do not accept yet. Read the five blocks in order and write down:

| Block | What to record |
|---|---|
| Status band | The verdict; the service DID (copy it in full); the evaluation time; the network chip |
| Service | Name, type, description; whether the logo is shown |
| Operated by | Legal name, country, registry identifier of the operator |
| Other credentials | Every additional credential: schema title, issuer, ecosystem |
| Trust chain | For the Service credential: the chain from issuer to ecosystem |

Then accept. You are connected to a Verifiable Service, and it has verified your wallet too.

Questions to answer in the report: Is the operator credential on the service itself or on the issuer of its Service credential? Which ecosystem is at the end of the Service credential's chain?

## Exercise 3. Accept an offer with the Q2 verdict in view (20 min)

From the service, request the demo credential. The wallet shows an offer screen with the status band and a sentence in words: "<issuer> is an authorized issuer of <credential> in <ecosystem>", in green, or its red equivalent.

Record the sentence exactly as shown, the credential name and the issuer DID. Accept the offer. Open the credential in the wallet and record the claims it carries.

## Exercise 4. Share a presentation with the Q3 verdict in view (20 min)

Open a playground use case that verifies the credential you hold (the use cases section lists them; Verandia's login is the simplest). Start the flow; the wallet shows a presentation request with the status band and the Q3 sentence: "<verifier> is an authorized verifier of <credential> in <ecosystem>", green or red.

Record the sentence, the verifier DID and which claims were requested. Share, and record what the service did with the presentation.

Then find the **refusal** demo on the playground: a service or a request that is deliberately untrusted or not authorized. Start it. Record what the wallet showed (the red verdict, the failed credentials and their reasons) and what action the wallet offered or disabled. This is fail-closed behavior; your report must say what failed and why.

## Exercise 5. Resolve the service DID on the indexer (30 min)

Take the service DID from exercise 2 and resolve it:

```bash
curl -s -X POST https://idx.testnet.verana.network/v4/verifiable-trust/resolve \
  -H 'content-type: application/json' \
  -d '{"did":"<service did>","ecsCredentials":true,"services":true,"participations":{"states":["ACTIVE"]},"presentations":{"includeInvalid":true}}' | jq
```

Read the response and record:

- `trusted` and `evaluatedAtTime`, `expiresAtTime`. Explain in one sentence why `expiresAtTime` has the value it has (hint: the earliest expiry involved).
- `ecsCredentials[]`: the Service credential and the operator credential, their issuer DIDs, and the anchored issuance time of each.
- `participations[]`: every active accreditation of the DID, with schema and role.
- `presentations[]`: how many linked presentations, and whether `invalidCredentialIds` or `unresolvableCredentialIds` is non-empty.

Now resolve the DID of the **issuer** of the Service credential the same way. This is the recursion of C1, section 7: record its `trusted` verdict and its accreditations. Which of its accreditations is the one that made the service's Service credential valid?

## Exercise 6. Read the participant tree (30 min)

From exercise 3 you have the credential name. Find its schema on the indexer (the credential schema list, filtered by the ecosystem you saw in exercise 2), and record the schema id, its three onboarding modes and its pricing asset:

```bash
curl -s https://idx.testnet.verana.network/v4/credential-schema/get/<id> | jq '{id, ecosystem_id, issuer_onboarding_mode, verifier_onboarding_mode, holder_onboarding_mode, pricing_asset_type, pricing_asset, digest_algorithm}'
```

Then list the participants of that schema:

```bash
curl -s 'https://idx.testnet.verana.network/v4/participant/list?schema_id=<id>' | jq '.participants[] | {id, did, role, validator_participant_id, effective_from, effective_until, validation_fees, issuance_fees, verification_fees}'
```

Record: the root entry (role `ECOSYSTEM`) and its fees; the issuer entry of the service that issued your credential and who validated it; the verifier entry of the service you presented to, or the fact that the verifier mode is open and no entry is needed. Draw the tree in the report, root at the top.

## Exercise 7. Narrate a use case (25 min)

Pick one playground use case you have not used yet (CEXA, BHI, Eventos, or another one listed). Run it end to end with your wallet. Then write a narrative of at most 250 words that tells the use case as a sequence of the three questions: at each step, who asked Q1, Q2 or Q3, about whom, and what the registry answered. Name the ecosystem and the schemas involved.

## Deliverable: the lab report

One Markdown file with these sections, in this order:

1. Wallet (exercise 1)
2. Proof-of-Trust of the demo service, the five blocks (exercise 2)
3. Offer and Q2 verdict (exercise 3)
4. Request and Q3 verdict, and the refusal (exercise 4)
5. Resolution of the service DID and of its issuer (exercise 5), with the JSON responses attached
6. Schema and participant tree, drawn (exercise 6)
7. Use case narrative (exercise 7)

Submit it on the Foundation platform. Level 1 candidates submit it for the automated checks only; Level 2 candidates submit it to their certificator for grading.

## How it is graded

Automated checks, binding:

- The service DID of section 2 resolves as `trusted` on the indexer at grading time.
- Section 5 contains the resolve response of that DID and of its Service credential issuer.
- Section 6 names a schema id that exists on the test network and a root participant of that schema.

Instructor review, against the published rubric:

- The five blocks of section 2 are read correctly, in particular the operator and the end of the chain.
- Sections 3 and 4 quote the verdict sentences and explain the refusal by its failed credentials, not by its look.
- Section 5 explains `expiresAtTime` and identifies the issuer's accreditation that made the Service credential valid.
- The tree of section 6 is correct: root, validators, issuer, verifier or open mode.
- The narrative of section 7 uses the three questions correctly and names the ecosystem and the schemas.

## Reading list

- Verana Playground: Personal wallets; Integrate; the use cases.
- docs.verana.io: Build, Verifiable services, Check that you are trusted; Build, Personal wallets, Render the Proof-of-Trust; Reference, Indexer API.
- Modules C1 (sections 5 to 7) and C2 (sections 4 to 7).

## Notes for instructors

The lab assumes the test network is on Verifiable Trust v4 and that the playground's main branch targets it. When the playground is mid-migration, run the lab against the network the playground's home page names, and tell candidates which indexer host to use. Collect the service DID candidates used: grading re-resolves it.
