import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default async function handler(req, res) {
  const { repo } = req.query;

  const reply = {}

  const { data: _data } = await octokit.rest.repos.get({
    owner: repo.split('/')[0],
    repo: repo.split('/')[1]
  })

  const d = await fetch('https://api.github.com/repos/' + repo + '/issues?per_page=5')
  const j = await d.json();

  const _d = await fetch('https://api.github.com/repos/' + repo + '/pulls?per_page=5')
  const _j = await _d.json();

  // https://api.github.com/repos/lutzroeder/netron/languages
  const { data } = await octokit.rest.repos.listLanguages({
    owner: repo.split('/')[0],
    repo: repo.split('/')[1]
  })

  reply.languages = data
  reply.data = _data
  reply.issues = j
  reply.prs = _j

  res.status(200).json(reply);
}
