# Security

Security architecture and control boundaries for the platform.

## Security Architecture Diagram

```mermaid
graph TB
    subgraph "Trust Boundary: Public Internet"
        Client[Client Apps]
        ProviderHooks[Provider Webhooks]
    end

    subgraph "Trust Boundary: Edge"
        WAF[Web Application Firewall]
        RateLimit[Rate Limiter]
        IPAllow[IP Allowlist]
    end

    subgraph "Trust Boundary: Application"
        API[NestJS API]
        Auth[JWT Auth + RBAC]
        Audit[Audit Logger]
        Fraud[Risk/Fraud Checks]
    end

    subgraph "Trust Boundary: Data"
        DB[(PostgreSQL - Neon)]
        KMS[KMS / Secrets Manager]
        Backup[(Encrypted Backups)]
    end

    subgraph "Detection & Response"
        SIEM[SIEM / Log Analytics]
        Alerting[Security Alerts]
        Incident[Incident Response]
    end

    Client --> WAF
    ProviderHooks --> WAF

    WAF --> RateLimit --> API
    IPAllow --> API

    API --> Auth
    API --> Audit
    API --> Fraud

    API --> DB
    KMS --> API
    DB --> Backup

    Audit --> SIEM
    SIEM --> Alerting --> Incident

    style WAF fill:#4CAF50
    style API fill:#2196F3
    style Alerting fill:#f44336
```

## Security Controls

- Enforce JWT authentication and role-based access control for protected routes.
- Restrict webhook endpoints using IP allowlists and signature verification.
- Store secrets in a managed secrets system; never hardcode credentials.
- Enable audit logging for admin actions and sensitive transaction flows.
- Encrypt data at rest and in transit; verify backup encryption policies.
