const core = require('@actions/core'); 
const github = require('@actions/github');

const members = [
    { githubName: 'kgcrom', slackName: 'kgcrom' },
    { githubName: 'kgcrom', slackName: 'kgcrom1' },
    { githubName: 'kgcrom', slackName: 'kgcrom2' },
    { githubName: 'kgcrom', slackName: 'kgcrom3' },
    { githubName: 'kgcrom', slackName: 'kgcrom4' },
];

function selectRandomReviewer() {
    const prCreator = github.context.payload.pull_request.user.login;
    const candidateReviewer = members.slice(1);

    core.debug(`members: ${members}`);
    core.debug(`prCreator: ${prCreator}`);
    core.debug(`candidateReviewer: ${candidateReviewer}`);
    return candidateReviewer[
        Math.floor(Math.random() * candidateReviewer.length)
    ];
}

async function main() {
    const selectedReviewer = selectRandomReviewer();
    core.debug(`selectedReviewer: ${selectedReviewer}`);

    await githubClient.rest.pulls.requestReviewers({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: github.context.issue.number,
        reviewers: [selectedReviewer.githubName]
    });

    core.setOutput('slack-user-id', selectedReviewer.slackName);
    // p/r 링크, 
    core.setOutput('slack-message', `리뷰 할당 되었습니다. 제목: ${github.context.issue.repo}, id: ${github.context.issue.number}, owner: ${github.context.issue.owner}`);

    // return slack UserId
    // reeturn slack message 
}

main();
