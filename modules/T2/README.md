---
code: T2
title: Building verifiable services
hours: 12
assessment: lab
version: 0.1
status: outline
summary: Issuance and verification on DIDComm and OpenID4VC, schemas and VTJSC, AnonCreds and SD-JWT, the MCP server.
---

# T2. Building verifiable services

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

12 class hours. Assessed by: lab.

## Learning objectives

After this module you can:

1. Issue and verify credentials over DIDComm (AnonCreds) and over OpenID4VC (SD-JWT VC) from a VS Agent.
2. Create a credential schema on the registry and use its VTJSC, type metadata and AnonCreds schema from the agent.
3. Implement the trust decision on received presentations: branch on the verdict, never read claims otherwise.
4. Verify peers before you connect and present your own credentials in flows.
5. Expose a service's capabilities to AI agents through the Verana MCP server.

## Prerequisites

C1, C2, C4, and T1 or an agent someone deployed for you. A programming language with an HTTP client.

## Outline

### 1. The agent's model

Connections, credential records, presentation records, flows; events; idempotency; the two rails and when each is negotiated.

### 2. Schemas for builders

Authoring the JSON Schema; anchoring; what the registry publishes (VTJSC, type metadata, AnonCreds schema); referencing them from the agent.

### 3. Issuance

DIDComm issue-credential with AnonCreds; OpenID4VCI with SD-JWT VC; claim mapping and display metadata; revocation and status lists; sessions and fees.

### 4. Verification

DIDComm present-proof; OpenID4VP; what to request and what not to; the four verdicts and the evidence note; caching rules.

### 5. Verifying peers

The trust decision on connections; presenting your Service credential; vt-flow for onboarding evidence.

### 6. AI agents and MCP

The Verana MCP server; exposing a service's flows as tools; the agent's own identity (preview of T7).

## Assessment

Lab: build a small service that issues one credential of a schema you created and verifies it back, on both rails, with the trust decision enforced. Graded on the test network against the rubric.

## Reading list

docs.verana.io: Build, Verifiable services (issue, verify, trust decision, verify peers); Build, AI agents and MCP; Reference, Credentials; Reference, VS Agent Admin API. Verifiable Trust specification v4: Credentials; Trust resolution. VS Agent specification v4.
