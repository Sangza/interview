 const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InterviewToken", function () {
  let InterviewToken, interviewToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract before each test
    InterviewToken = await ethers.getContractFactory("InterviewToken");
    interviewToken = await InterviewToken.deploy();
    await interviewToken.waitForDeployment();
  });

  it("Should deploy with correct name and symbol", async function () {
    expect(await interviewToken.name()).to.equal("InterviewToken");
    expect(await interviewToken.symbol()).to.equal("ITK");
  });

  it("Should assign the initial supply to the owner", async function () {
    const ownerBalance = await interviewToken.balanceOf(owner.address);
    const totalSupply = await interviewToken.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Owner should be able to mint new tokens", async function () {
    await interviewToken.mint(addr1.address, 100);
    const balance = await interviewToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("100", 18));
  });

  it("Non-owner should not be able to mint", async function () {
    await expect(
      interviewToken.connect(addr1).mint(addr1.address, 100)
    ).to.be.revertedWithCustomError(interviewToken, "OwnableUnauthorizedAccount");
  });

  it("Owner should be able to burn tokens", async function () {
    const initialBalance = await interviewToken.balanceOf(owner.address);
    await interviewToken.burn(100);
    const finalBalance = await interviewToken.balanceOf(owner.address);
    expect(finalBalance).to.equal(initialBalance - ethers.parseUnits("100", 18));
  });

  it("Should allow transfers between accounts", async function () {
    await interviewToken.transfer(addr1.address, ethers.parseUnits("50", 18));
    const balance = await interviewToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("50", 18));
  });

  it("Should not allow transfers when paused", async function () {
    await interviewToken.pause();
    await expect(
      interviewToken.transfer(addr1.address, ethers.parseUnits("10", 18))
    ).to.be.revertedWith("Pausable: paused");
  });

  it("Should allow transfers again after unpausing", async function () {
    await interviewToken.pause();
    await interviewToken.unpause();
    await interviewToken.transfer(addr1.address, ethers.parseUnits("10", 18));
    const balance = await interviewToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseUnits("10", 18));
  });
});
