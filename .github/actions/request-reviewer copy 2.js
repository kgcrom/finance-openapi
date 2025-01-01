async function main() {
    const selectedReviewer = selectRandomReviewer();
  
    await githubClient.rest.pulls.requestReviewers({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: github.context.issue.number,
      reviewers: [selectedReviewer.githubName]
    });
  }
  
  function selectRandomReviewer() {
    const prCreator = github.context.payload.pull_request.user.login;
    const candidateReviewer = getCandidates().filter(
      (person) => person.githubName !== prCreator
    );
  
    return candidateReviewer[
      Math.floor(Math.random() * candidateReviewer.length)
    ];
  }