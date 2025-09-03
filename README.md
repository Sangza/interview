# InterviewToken (ERC-20 Smart Contract)

**InterviewToken** is a simple ERC-20 token built with the [OpenZeppelin](https://docs.openzeppelin.com/contracts) contract standard.
It was developed as part of an interview assignment and runs on the **Ethereum blockchain** (or any EVM-compatible chain).

---

## Features

- **Mintable & Burnable** → Owner can mint new tokens and burn their own supply.
- **Transferable** → Token holders can freely transfer tokens.
- **Pausable** → Owner can pause/unpause all token transfers.
- **Access Control** → Restricted with `onlyOwner` modifier for critical functions.

---

## Project Structure

```
contracts/
└── InterviewToken.sol     # ERC-20 smart contract
scripts/
└── deploy.js              # Deployment script
test/
└── InterviewToken.js      # Hardhat tests
hardhat.config.js          # Hardhat configuration
.env                       # Environment variables
```

---

## Setup & Deployment

### 1. Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv
```

### 2. Compile the Contract

```bash
npx hardhat compile
```

### 3. Local Deployment

Start a local Hardhat node:

```bash
npx hardhat node
```

Deploy the contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Deploy to Sepolia (Testnet)

Create a `.env` file in the project root:

```env
ALCHEMY_API_KEY=your-alchemy-api-key
PRIVATE_KEY=your-wallet-private-key
ETHERSCAN_API_KEY=your-etherscan-api-key
```

Deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Verify on Etherscan:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

---

## 🧪 Testing

Run unit tests:

```bash
npx hardhat test
```

---

## 🛠 Example Usage

- **Mint tokens** (onlyOwner):

  ```solidity
  interviewToken.mint(0xRecipient, 100);
  ```

- **Burn tokens** (onlyOwner):

  ```solidity
  interviewToken.burn(50);
  ```

- **Pause/unpause transfers**:

  ```solidity
  interviewToken.pause();
  interviewToken.unpause();
  ```

---

## 📜 License

This project is licensed under the MIT License.
