import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function handler(req, res) {
  const { q } = req.query;
  const { data } = await octokit.rest.search.repos({
    q,
    sort: "stars",
    order: "desc",
    page: "1",
    per_page: "10"
  });

  res.status(200).json(data.items);
}
