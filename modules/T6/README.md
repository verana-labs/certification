---
code: T6
title: Security
hours: 4
assessment: exam
version: 0.1
status: outline
summary: Key management, did:webvh log integrity, incident response, post-quantum roadmap.
---

# T6. Security

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

4 class hours. Assessed by: exam.

## Learning objectives

After this module you can:

1. Model the keys of a Verifiable Service and of a Corporation, and protect each according to its blast radius.
2. Explain did:webvh log integrity and detect a tampered or forked log.
3. Respond to an incident: key compromise, revoked credential, slashed deposit, lost agent.
4. Describe the post-quantum roadmap of the specifications and what to prepare now.

## Prerequisites

C1, C2. Security fundamentals (keys, TLS, threat modeling).

## Outline

### 1. Threat model

Who attacks a Verifiable Service, a wallet, an ecosystem; what each attack gains; what Verifiable Trust takes away from phishing.

### 2. Keys

DID keys, agent keys, operator accounts, group policies; hardware-backed storage; rotation; separation of duties; never on a laptop.

### 3. did:webvh integrity

The log, hashes, pre-rotation, witnesses; what resolution checks; detecting a fork or a replaced document.

### 4. Incident response

Playbooks: key compromise, agent host lost, credential revoked under you, ecosystem slashed you; who to notify; recovery on a new host with the same DID.

### 5. Post-quantum

What breaks, what does not; the roadmap in the specifications; crypto agility in schemas and formats.

## Assessment

Knowledge exam (sixty minutes, seventy percent).

## Reading list

Verifiable Trust specification v4: Security considerations. did:webvh specification. docs.verana.io: Build, Verifiable services (DID pages); Build, Run infrastructure.
