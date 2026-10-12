---
code: T1
title: VS Agent operations
hours: 8
assessment: lab
version: 0.1
status: outline
summary: Deploy VS Agent with Docker Compose and Helm, did:webvh, ECS onboarding, the Admin API, upgrades and backups.
---

# T1. VS Agent operations

> **Outline.** The material of this module is being written by the Showcase and Certification Working Group. The objectives, outline and assessment below are the agreed scope for program version 2026.1.

8 class hours. Assessed by: lab.

## Learning objectives

After this module you can:

1. Deploy VS Agent with Docker Compose and with the Helm chart, with its database, Redis and public endpoint.
2. Create and serve a did:webvh DID for a service and keep its log consistent across restarts.
3. Onboard the service on the ECS ecosystem (Service and Organization credentials) and publish its linked presentations.
4. Operate the Admin API: connections, credentials, presentations, events, authorization allowlist.
5. Upgrade, back up and restore an agent without losing its DID.

## Prerequisites

C1, C2, C4. Comfort with Docker and a terminal; basic Kubernetes for the Helm part.

## Outline

### 1. Architecture

What VS Agent is; processes, database, cache, endpoints; the Admin API and the DIDComm and OpenID4VC endpoints; what must be public and what must not.

### 2. Deployment

Docker Compose for a developer machine; Helm chart values for a cluster; TLS, hostnames, the ingress class and the certificate issuer; secrets.

### 3. The DID

did:webvh: creating the DID, the log, the witness question, serving the document; rotating keys; what breaks resolution.

### 4. ECS onboarding

Obtaining the Service and Organization credentials from the ECS issuer of the network; publishing linked presentations; triggering the indexer; checking that you are trusted.

### 5. Admin API in operation

Authentication, allowlist-only authorization, events and webhooks, the state of a connection, credential and presentation records.

### 6. Day 2

Upgrades and the changelog; database backups; restoring on a new host with the same DID; monitoring and logs; incident basics.

## Assessment

Lab: deploy an agent on a host you control, give it a did:webvh DID, get it trusted on the test network, and show the Admin API answering. Automated check: the DID resolves as trusted on the indexer at grading time.

## Reading list

docs.verana.io: Build, Verifiable services (all deployment and DID pages); Build, Run infrastructure; Reference, VS Agent and Admin API. verana-labs/verana-deploy-examples.
