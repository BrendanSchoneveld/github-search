import {Octokit} from "octokit";
// Octokit.js
// https://github.com/octokit/core.js#readme
export const octokit = new Octokit({
    auth: process.env.OCTOKIT_API_KEY
})
