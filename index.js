const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const path = "./data.json";

const startDate = moment("2025-03-12");
const endDate = moment("2025-03-30");

const getRandomDateInRange = () => {
    const daysRange = endDate.diff(startDate, "days");
    return startDate.clone().add(randomInt(0, daysRange), "days");
};

const markCommit = async (date) => {
    const data = { date: date.toISOString() };
    await jsonfile.writeFile(path, data);

    const git = simpleGit();
    await git.add([path]);
    await git.commit(date.toISOString(), { "--date": date.toISOString() });
};

const makeCommits = async (n) => {
    const git = simpleGit();

    for (let i = 0; i < n; i++) {
        const randomDate = getRandomDateInRange();
        console.log(`Creating commit: ${randomDate.toISOString()}`);
        await markCommit(randomDate);
    }

    console.log("Pushing all commits...");
    await git.push();
};

makeCommits(32);
