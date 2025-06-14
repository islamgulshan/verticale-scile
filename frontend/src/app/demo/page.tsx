'use client';

import { useState, useEffect } from 'react';

type Job = {
  id: string;
  title: string;
  description: string;
};

type Match = {
  candidateId: string;
  score: number;
};

export default function DemoPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/jobs`)
      .then((res) => res.json())
      .then(setJobs)
      .catch((err) => console.error('Failed to load jobs', err));
  }, []);

  const handleClick = async (jobId: string) => {
    setSelectedJob(jobId);
    setLoading(true);

    try {
      // Step 1: Trigger the match job (enqueue)
      await fetch(`${baseUrl}/match?jobId=${jobId}`);

      // Step 2: Poll the result from Redis cache
      let attempts = 0;
      const maxAttempts = 10;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      let cachedData = null;

      while (attempts < maxAttempts) {
        const res = await fetch(`${baseUrl}/match/result?jobId=${jobId}`);
        const data = await res.json();

        if (data && data.length > 0) {
          cachedData = data;
          break;
        }

        attempts++;
        await delay(1000); // wait 1 second before next attempt
      }

      if (!cachedData) {
        console.warn('No match results found after polling.');
        setMatches([]);
      } else {
        setMatches(cachedData);
      }
    } catch (err) {
      console.error('Error processing match:', err);
      setMatches([]);
    }

    setLoading(false);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Job Matching Demo</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <ul className="list-disc list-inside">
          {jobs.map((job) => (
            <li key={job.id}>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleClick(job.id)}
              >
                {job.title}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {loading && <p>Loading matches...</p>}

      {!loading && matches.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Top Matches</h2>
          <table className="table-auto border border-collapse w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Candidate ID</th>
                <th className="border px-4 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.candidateId}>
                  <td className="border px-4 py-2">{m.candidateId}</td>
                  <td className="border px-4 py-2">{m.score.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {!loading && selectedJob && matches.length === 0 && (
        <p>No matches found.</p>
      )}
    </main>
  );
}
