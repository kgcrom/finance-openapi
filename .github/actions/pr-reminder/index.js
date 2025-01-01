const core = require('@actions/core'); 
const github = require('@actions/github');

const COLLECT_REPOS = [
    'finance-openapi',
];

function isDraft(pr) {
    return pr.draft
}

function isAlreadyReviewed(pr) {
    return pr.requested_reviewers.length > 0
}

function collectMessages(pullRequests) {
    return pullRequests
        .flatMap((pr) => {
            if (isDraft(pr) || isAlreadyReviewed(pr)) return [];
            else return [constructMessage(pr)];
        }
    )
}
  
function sendMessage(messages) {
    messages.forEach((message) => {
        core.info(message);
    });
    core.setOutput('slack-message', 'test');
}


(async () => {
    const githubToken = core.getInput('github-token');
    const octokit = github.getOctokit(githubToken);
        
    const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
  
    // const { data: pullRequests } = COLLECT_REPOS.flatMap(async (repo) => {
    //     await octokit.rest.pulls.list({
    //         owner: 'kgcrom',
    //         repo,
    //         state: "open",
    //         per_page: 50,
    //         sort: "updated",
    //         direction: "desc"
    //     });
    // });
    core.info(`repo: ${github.context.repo.repo}`);
    core.info(`owner: ${github.context.repo.owner}`);
    const { data: pullRequests } = await octokit.rest.pulls.list({
        owner: 'kgcrom',
        repo: 'finance-openapi',
        state: "open",
        per_page: 100,
        sort: "updated",
        direction: "desc"
      });
    core.info(JSON.stringify(pullRequests));
    const messages = collectMessages(pullRequests);
    sendMessage(messages);
})();
  