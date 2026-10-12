---
code: T7
title: Verifiable AI agents
hours: 4
assessment: exam and lab
version: 0.1
status: outline
summary: Agent identity, MCP, agent-to-service trust.
---

# T7. Verifiable AI agents

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

4 class hours. Assessed by: exam and lab.

## Learning objectives

After this module you can:

1. Give an AI agent a DID and the Essential Credentials so that it is a Verifiable Service in its own right.
2. Make an agent resolve trust before connecting to a service and present its identity when asked.
3. Use the Verana MCP server from an agent and expose a service to agents.
4. Explain delegation: what a person's wallet, a business wallet and an agent each hold, and how a service tells them apart.

## Prerequisites

C1, C2, C4, and the reduced T2 reading.

## Outline

### 1. Why agents need identity

The problem of C1 seen from software; agent-to-service and service-to-agent trust; what a logo cannot do for a program.

### 2. An agent as a Verifiable Service

DID, Service credential with an agent type, operator credential; what the Proof-of-Trust of an agent looks like.

### 3. An agent as a user agent

Resolve before connecting; verdicts as data; refusing untrusted services; presenting the User Agent credential.

### 4. MCP

The Verana MCP server; registry and graph tools; VS Agent tools; authorization of an agent on a service.

### 5. Delegation

Personal wallet, business wallet, agent: who holds what; delegated credentials; limits and revocation.

## Assessment

Knowledge exam and a lab: an agent with its own DID connects to a playground service, is trusted, and completes one flow through MCP.

## Reading list

docs.verana.io: Build, AI agents and MCP. Verifiable Trust specification v4: Verifiable User Agents. The Eclipse M4P webinar recording (verana-research).
