const hre = require("hardhat");

async function main() {
  const InterviewToken = await hre.ethers.getContractFactory("InterviewToken");
  const interviewToken = await InterviewToken.deploy();
  await interviewToken.waitForDeployment();
  console.log(`InterviewToken deployed to: ${interviewToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});