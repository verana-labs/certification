---
code: T3
title: Wallet and user-agent integration
hours: 8
assessment: lab
version: 0.1
status: outline
summary: The trust screen, gating accept and share, the Proof-of-Trust kit and the conformance harness.
---

# T3. Wallet and user-agent integration

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

8 class hours. Assessed by: lab.

## Learning objectives

After this module you can:

1. Implement VUA-REQ-1 to VUA-REQ-3 in a wallet: resolve before connecting, verify issuers on offers, verifiers on requests.
2. Render the Proof-of-Trust with the five blocks, the three states and the wording patterns.
3. Gate accept and share on the verdicts and demote unsafe actions.
4. Hold and present the User Agent credential.
5. Pass the conformance harness and get listed on the playground.

## Prerequisites

C1, C2, C4. A wallet or user-agent codebase you can change.

## Outline

### 1. Being a Verifiable User Agent

The requirements; the resolver client; what to resolve, when, and with which bound; caching positives, never negatives.

### 2. The trust screen

The five blocks; states and wording; icons; first contact; the playground's Proof-of-Trust kit and how to adapt it.

### 3. Gating

Offers: Q2 in words; requests: Q3 in words; disabled or demoted actions; what to log.

### 4. The User Agent credential

Obtaining it from the ECS User Agent issuer; presenting it to services; AnonCreds specifics.

### 5. Conformance

The six scenarios of the harness; running them; the listing process and the status and trust-screen columns.

## Assessment

Lab against the conformance harness: the wallet passes the six scenarios and the trust screen is reviewed against the Proof-of-Trust contract.

## Reading list

docs.verana.io: Build, Personal wallets (all pages). Verifiable Trust specification v4: Verifiable User Agents. The Personal wallets guideline (PW-POT section). Playground: Integrate.
