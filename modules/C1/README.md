---
code: C1
title: Verifiable Trust fundamentals
hours: 4
assessment: exam
version: 1.0
status: published
summary: The problem Verifiable Trust solves, Verifiable Services and User Agents, the Essential Credential Schemas, the three questions and trust resolution.
---

# C1. Verifiable Trust fundamentals

Core module of every track. Four class hours, or a day of self-study. Assessed by a knowledge exam.

## Learning objectives

After this module you can:

1. Explain what today's internet proves about a service and what it does not, and why that gap matters for credentials and for AI agents.
2. Define a Verifiable Service, a Verifiable User Agent and a Verifiable Public Registry, and say which one does what.
3. Name the five Essential Credential Schemas, say what each proves, and explain how a wallet finds them.
4. State the three questions a wallet or a service asks before it acts, and where each answer comes from.
5. Follow a trust resolution from a DID to an ecosystem, and explain why a result is trusted, untrusted or could not be verified.
6. Tell the three credential formats and two transport rails apart, and say what is identical across them.

## Prerequisites

None. You should have used a mobile app that scans QR codes and have a general idea of what a digital signature is.

---

## 1. The problem

When you open a website, the browser proves one thing: the server you reached owns the domain name in the address bar. The padlock says nothing about who runs the service, whether they are allowed to ask for what they are asking, or whether the thing they are about to give you is worth anything.

That gap was tolerable when the web was pages. It is not tolerable when the web is credentials. A verifiable credential is a signed statement about you, and the two moments that matter are:

- **An offer.** Someone proposes to give you a credential. If the issuer is not who they claim, or is not entitled to issue that kind of credential, the credential is worthless and you have just been phished into trusting a logo.
- **A request.** Someone asks you to present a credential. If the verifier is not entitled to ask, you have just disclosed personal data to a stranger because a screen looked official.

Wallets today answer both moments with the same tool a browser has: a name and a logo that anyone can copy. People are asked to decide, with no information, and they decide with their eyes.

The same problem is now arriving for software. An AI agent that books, pays and signs on your behalf connects to services it has never seen. It has no eyes to fool, and no basis to decide either.

Verifiable Trust closes the gap. It gives every service a way to prove who it is and what it is accredited to do, gives every wallet and agent a way to check that proof before connecting, and publishes the accreditations in a public registry that no single party controls.

## 2. The three building blocks

Verifiable Trust is built from three things. Keep them apart; most confusion comes from mixing them.

| Block | What it is | Who runs it |
|---|---|---|
| **Verifiable Public Registry (VPR)** | A public ledger that records ecosystems, their credential schemas, who is accredited to issue and verify each schema, and the deposits behind them. It holds accreditations, not credentials. | A network of validators. The Verana network is one. |
| **Verifiable Service (VS)** | A service identified by a resolvable DID whose DID Document presents its identity credentials and declares how to connect. It verifies its peers before serving them. | Any organization or person. Usually operated with VS Agent. |
| **Verifiable User Agent (VUA)** | A wallet, browser or agent acting for a person. It resolves trust before connecting and shows a Proof-of-Trust. | Wallet vendors, browser vendors, agent builders. |

Around them, an **Ecosystem** is a registry entry controlled by an organization: a DID, a governance framework, credential schemas, and the tree of participants accredited for them. What other communities call a trust registry, Verana calls an ecosystem, and there can be thousands of them on one registry.

## 3. Verifiable Services

A Verifiable Service is a service you can check. Four things make it one.

**A resolvable DID.** The service is identified by a decentralized identifier. In v4 the methods are `did:web` and `did:webvh`; `did:webvh` adds a verifiable history log so a key rotation or a takeover cannot be hidden. Resolving the DID returns a DID Document.

**Linked verifiable presentations.** The DID Document declares presentations published at URLs, so anyone resolving the DID finds the credentials the service chose to make public. This is how a service presents its own identity: not in a conversation, but on its DID, where a wallet can read it before saying hello.

**Essential Credentials.** Among those presentations, two are mandatory: a Service credential, which says what the service is, and either an Organization credential or a Persona credential, which says who operates it. Section 4 covers them.

**A DIDComm endpoint.** The DID Document declares a DIDComm service endpoint. DIDComm is the mandatory bootstrap channel: a wallet connects there first, and other rails such as OpenID4VC can be negotiated afterwards.

The fourth property is behavioral: a Verifiable Service verifies its peers. When a wallet connects, the service resolves the wallet's trust too (Section 5), and when it receives a credential it checks the issuer before it acts on the claims (Section 7).

> In practice a Verifiable Service is run with **VS Agent**, the Verana agent runtime. It holds the DID and the credentials, speaks DIDComm and OpenID4VC, resolves trust, and operates on the registry for its organization. Module T1 covers running it; T2 covers building on it.

## 4. The Essential Credential Schemas

A credential is only useful if everyone agrees what it means. Verifiable Trust fixes five schemas that make a minimum trust resolution possible, the **Essential Credential Schemas (ECS)**:

| Schema | Issued to | What it proves | Key claims |
|---|---|---|---|
| **Service** | A service DID | What this service is | `id` (the service DID), `name`, `type`, `description`, `logoUri` with its digest, `minimumAgeRequired`, `termsAndConditionsUri` and `privacyPolicyUri` with their digests |
| **Organization** | A service DID | Which legal entity operates it | legal name, registry identifier, country, address |
| **Persona** | A service DID | Which person operates it | name, country |
| **User Agent** | A wallet or agent | That this wallet or agent is a known, conformant user agent | name, version, vendor |
| **Badge** | Anyone | A generic, ecosystem-defined attestation | ecosystem-defined |

Three facts about them matter in every later module.

**They are published by an ecosystem.** On each network one ecosystem, the **ECS ecosystem**, publishes the five schemas and accredits their issuers. It is the trust root of every Proof-of-Trust: when a wallet says "this service is operated by Acme GmbH", it means "an issuer accredited by the ECS ecosystem for the Organization schema said so".

**They are found by digest, not by name.** A wallet does not look for a schema called "Service". It canonicalizes the JSON schema (JCS) and hashes it (SHA-384), and compares the digest with the one the specification publishes. A schema with the right name and a different byte is not the ECS Service schema. This is what lets any network host its own copy of the schemas while every wallet still recognizes them.

**Service plus operator.** A service is trusted only when it presents a valid Service credential and exactly one operator credential, Organization or Persona, either on itself or on the issuer of its Service credential. A service with a Service credential and no operator is not trusted. A service with two operators is not trusted either.

The URIs in the Service credential come with digests (subresource integrity): the logo, the terms and the privacy policy a wallet shows are the ones the issuer saw when it issued the credential, not whatever is at the URL today.

## 5. Verifiable User Agents

A Verifiable User Agent is a wallet, browser or agent that acts for a person and refuses to act blind. The specification states its duties as requirements; three of them define the behavior you will see in every module and every demo.

**Resolve before you connect (VUA-REQ-1).** Before establishing a connection with a service, the agent resolves the service DID, runs trust resolution and shows the result. A connection to an untrusted service is either refused or allowed only behind an explicit unsafe step.

**Verify the issuer of every offer (VUA-REQ-2).** When a credential is offered, the agent checks that the issuer is a trusted Verifiable Service and is accredited to issue that schema, and shows the verdict in words before the person accepts.

**Verify the verifier of every request (VUA-REQ-3).** When a presentation is requested, the agent checks that the requester is trusted and accredited to verify that schema, and shows the verdict before the person shares.

The result of these checks is rendered as a **Proof-of-Trust**, and every integrated wallet renders it the same way so that people learn to read it once:

1. **Status band**: the verdict (trusted, untrusted, could not verify), the service DID, the evaluation time, a network chip on non-production networks.
2. **Service**: name, type, logo and description from the Service credential.
3. **Operated by**: legal name, country, registry identifier and address from the Organization credential, or name and country from the Persona credential.
4. **Other credentials**: everything else the service presents, each with its own validity mark.
5. **Trust chain and failures**: per credential, the chain from issuer to ecosystem, and, when untrusted, the failed credentials with their reasons.

Two rules of the Proof-of-Trust explain its design: only claims from verified credentials are rendered as facts, and there are no invented signals, no stars, no scores beyond what resolution returned.

A user agent presents its own identity too. It holds a User Agent credential, issued under the ECS User Agent schema, so that a service can tell a conformant wallet from an unknown client.

## 6. The three questions

Everything a wallet or a service decides reduces to three questions. Learn them in this form; the exam and the labs use it.

| | Question | Who asks it | Where the answer comes from |
|---|---|---|---|
| **Q1** | Is this service trusted? | A wallet before connecting; a service about a peer | Trust resolution of the DID: valid Service credential plus one operator credential, each chained to the ECS ecosystem |
| **Q2** | Is this issuer authorized to issue this credential? | A wallet on an offer; a service on a credential it receives | Q1 on the issuer, then the issuer's active accreditation as issuer of this schema in the registry |
| **Q3** | Is this verifier authorized to ask for this credential? | A wallet on a presentation request | Q1 on the verifier, then the verifier's active accreditation as verifier of this schema in the registry |

Q2 and Q3 both begin with Q1: an accreditation belongs to a trusted service or it is not worth reading. And Q2 and Q3 are answered by the registry, not by the service: an issuer cannot declare itself authorized, only its ecosystem can accredit it.

For some schemas the ecosystem decides that anyone may issue or anyone may verify. The registry records that choice as an onboarding mode (module C2), and the wallet still shows it: "anyone may verify this credential" is an answer, not an absence of one.

## 7. Trust resolution

Trust resolution is the procedure that answers Q1, and it is recursive. Starting from a DID:

1. **Resolve the DID** and read the DID Document. Only `did:web` and `did:webvh` are accepted, with no redirects and never a private address.
2. **Read the linked presentations** declared in the document and fetch each one.
3. **Verify each credential** in them: signature, validity dates, status, and that the signing key belongs to the issuer's DID Document.
4. **Find the credential's schema.** Every Verifiable Trust Credential references a **VTJSC**, the Verifiable Trust JSON Schema Credential that an ecosystem DID issued about one of its schemas. The VTJSC binds the credential to a schema on the registry and to the ecosystem that owns it.
5. **Check the issuer's accreditation** in the registry: an active participant entry as issuer of that schema, valid at the time the credential was issued. The issuance time is objective because the credential's digest was anchored on the registry.
6. **Recurse on the issuer**: resolve its DID and repeat, until you reach the ecosystem DID itself.
7. **Apply the ECS rule**: a valid Service credential and exactly one Organization or Persona credential, on the service or on the issuer of its Service credential.

The outcome is one of three states, and the third one is as important as the first two:

| State | Meaning | What an agent does |
|---|---|---|
| **Trusted** | Every chain intact, the ECS rule satisfied | Connect, accept, share |
| **Untrusted** | A credential failed, a chain is broken, an operator is missing or duplicated | Refuse, or demote behind an explicit unsafe step; show the failed credentials and their reasons |
| **Could not verify** | A read did not complete within its bound: DID resolution, a presentation URL, the registry | Do not act now; retry |

Verifiable Trust fails closed. "Could not verify" is never rounded up to trusted, and a wallet never acts on claims from a presentation whose verdict is not trusted. Positive results may be cached for a bounded time; negative results are never cached, so a fixed service is trusted again as soon as it is fixed.

For a service receiving a credential (Q2 from the service side), the same procedure yields four verdicts: trusted and authorized, trusted but not authorized for this schema, untrusted, and resolver unavailable. Only the first one lets a backend read the claims.

In v4 the indexer of the network performs trust resolution and exposes it as an API, so wallets and services do not have to implement the recursion themselves; module C4 makes you call it.

## 8. Formats and rails

Verifiable Trust does not pick a credential format. Three are supported, over two transport rails:

| Format | Typical rail | Selective disclosure | Where you meet it |
|---|---|---|---|
| **AnonCreds** | DIDComm | Yes, with unlinkable proofs | Hologram and other DIDComm wallets; the User Agent credential |
| **SD-JWT VC** | OpenID4VC (OpenID4VCI to issue, OpenID4VP to present) | Yes, by disclosure | EUDI-style wallets |
| **W3C JSON-LD** | DIDComm | No | Public credentials such as linked presentations |

What is identical across formats is the part that makes trust resolution possible: every credential references a VTJSC, through its schema or its credential definition or its type metadata, and the VTJSC references a schema and an ecosystem on the registry. A wallet that answers Q2 for an SD-JWT credential over OpenID4VP asks exactly the same registry question as a wallet that answers it for an AnonCreds credential over DIDComm.

DIDComm remains the mandatory bootstrap channel of a Verifiable Service. OpenID4VC is negotiated on top where both sides support it.

## 9. Where to see it

- The **Verana Playground** (playground.testnet.verana.network) runs demo services and use cases against the test network with real wallets. Module C4 is a practicum on it.
- The **indexer** of each network exposes trust resolution: `POST /v4/verifiable-trust/resolve` with a DID returns `trusted`, the identity credentials, the active accreditations and the presentations with what failed.
- The **trust graph** of the network lists every trusted DID, ecosystem, schema and accreditation.
- The **frontend** of the network renders any DID as a card with its trust state, identity claims and accreditations.

## Key takeaways

- TLS proves a domain; Verifiable Trust proves who a service is and what it is accredited to do.
- Registry, Verifiable Service, Verifiable User Agent: accreditations, services that prove themselves, agents that check.
- Five Essential Credential Schemas, found by digest, published by one ECS ecosystem per network; Service plus exactly one operator.
- Three questions: trusted, authorized to issue, authorized to verify. The registry answers the last two.
- Trust resolution is recursive, ends at an ecosystem DID, and fails closed; three states, never round up.
- Formats and rails differ; the VTJSC reference is what makes them the same.

## Self-check

These are study questions, not exam questions.

1. A service presents a valid Service credential and two valid Organization credentials from two different accredited issuers. Is it trusted? Why?
2. A wallet receives an offer from a service that is trusted. What else must be true before the wallet shows a green verdict on the offer?
3. A service's presentation URL times out. Which state does the wallet show, and may it cache it?
4. Two networks each host an ECS Service schema. How does a wallet know both are the real one?
5. Which block of the Proof-of-Trust would show you that a service's logo is the one its issuer saw?
6. An issuer's accreditation ended last month. A credential it issued last year is presented today. Can the credential still be trusted? What decides?

## Reading list

- Verifiable Trust specification v4: Introduction; Verifiable Services; Verifiable User Agents (VUA-REQ-1 to VUA-REQ-3); Essential Credential Schemas; Trust resolution.
- docs.verana.io: Understand, Start here; Understand, Discovery; Reference, Credentials, Essential Credential Schemas; Reference, Glossary.
- Verana Playground: the Personal wallets and Integrate pages.

## Assessment

Knowledge exam on the Foundation platform: scenario-based multiple choice drawn from the Level 1 bank, sixty minutes, pass mark seventy percent. This module's questions also enter the Level 1 Fundamentals exam together with C2 and C4.
