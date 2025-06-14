Architecture:

1: Job Ingestion (NestJS + BullMQ):

    Accepts new jobs via REST API.
    Embedding generated (via ML model/API).
    Job+embedding pushed to BullMQ queue.

2: Matching Worker (NestJS microservice):

    Consumes match-job queue.
    Queries all pgvector shards in parallel for ANN match.
    Aggregates top-k candidates (e.g., 100).
    Stores match result in Redis: job:{id} → [candidate_ids].

3: pgvector Sharding:

    15M candidates sharded across N Postgres instances.
    Shard by candidate ID hash.
    Each uses pgvector with ivfflat index for fast similarity search.

4: Redis Caching:

    Redis stores job match results for ~10 minutes.
    API layer checks Redis first for fast response (<100ms).
    Cold cache → compute → store.

5: API Gateway (NestJS):

    Serves GET /jobs/:id/matches.
    Implements rate limiting + observability (P99 < 2s).

Clients → API Gateway → Redis Cache
↳ Compute if miss → BullMQ → Matching Worker
↳ pgvector shards (parallel ANN)
