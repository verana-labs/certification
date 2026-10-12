---
code: T4
title: Ecosystem operations on chain
hours: 8
assessment: lab
version: 0.1
status: outline
summary: Frontend and CLI, creating Ecosystems and schemas, participant management, keys and accounts, indexer and resolver APIs, TRQP.
---

# T4. Ecosystem operations on chain

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

8 class hours. Assessed by: lab.

## Learning objectives

After this module you can:

1. Create a Corporation, authorize operators and fee grants, and explain the group policy.
2. Create an Ecosystem with its DID and governance framework digest, and anchor a credential schema.
3. Create the root participant, accredit grantors, validate applicants from pending tasks, set and change effective windows.
4. Query the indexer, the graph and the resolver, and answer a TRQP question.
5. Manage keys and accounts safely: mnemonics, hardware-backed keys, separation of duties.

## Prerequisites

C1, C2, C3, C4. A terminal; test-network coins from the faucet.

## Outline

### 1. Accounts and keys

Keyring, mnemonics, the faucet; separation between personal, operator and agent accounts; where keys must never be.

### 2. Corporations in practice

Creating the group and policy in the frontend and the CLI; proposals versus operators; VS operator authorization; fee grants.

### 3. Ecosystems and schemas

Creating the ecosystem; the DID and its control; anchoring the governance framework; defining a schema; what is immutable.

### 4. Participants

Root with fees; grantors; onboarding processes from the applicant and the validator side; pending tasks; discounts; windows; revocation.

### 5. Reading everything

Indexer entities and resolve; the trust graph; the resolver; TRQP authorization and recognition queries.

## Assessment

Lab on the test network: a Corporation, an Ecosystem, a schema with ecosystem onboarding, a root, one validated issuer, one TRQP query answered. Automated check: the ecosystem exists with the expected schema and root participant.

## Reading list

docs.verana.io: Build, Ecosystems (all pages); Reference, CLI; Reference, Indexer API; Reference, Graph API. VPR specification v4; Frontend specification v4.
