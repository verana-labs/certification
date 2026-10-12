---
code: T5
title: Network infrastructure
hours: 6
assessment: lab
version: 0.1
status: outline
summary: Indexer, resolver, faucet, monitoring, and the boundary with what the Council governs.
---

# T5. Network infrastructure

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

6 class hours. Assessed by: lab.

## Learning objectives

After this module you can:

1. Run an indexer, a resolver and a faucet for a Verana network and keep them in sync with the chain.
2. Monitor them: metrics, alerts, what a lagging indexer looks like, what a broken resolver looks like.
3. Explain the boundary between what an operator runs and what the Council governs (validators, parameters, upgrades).
4. Plan capacity and backups for the network services around VS Agent.

## Prerequisites

T1 or equivalent operations experience. Kubernetes basics.

## Outline

### 1. The services around the chain

Indexer, resolver, faucet, frontend, graph; what each depends on; which ones are stateless.

### 2. Running the indexer

Replay, snapshots, lag, re-evaluation triggers; database sizing; the resolve endpoint under load.

### 3. Resolver and faucet

DID resolution caching and private-address rules; faucet policies on a test network.

### 4. Observability

Metrics, logs, alerts; dashboards worth having; runbooks for lag, stuck replay, and resolver failures.

### 5. Governance boundary

Validators, parameters and upgrades are Council matters; what an operator can and cannot change; how to propose.

## Assessment

Lab: run an indexer and a resolver against the test network from a clean host, with monitoring, and demonstrate recovery from an induced lag.

## Reading list

docs.verana.io: Build, Run infrastructure; Reference, Network. verana-labs/verana-deploy-examples.
