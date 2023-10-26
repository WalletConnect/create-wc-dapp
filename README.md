# CREATE-WC-DAPP

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

`create-wc-dapp` is an `npx` starter template that allows you to easily set up a
WalletConnect integrated dApp. With just one command, you can bootstrap your
project and get started with WalletConnect v2 and Web3Modal 📲

[![asciicast](/static/demo.gif)](https://asciinema.org/a/v26NPtirFdqbw0RtJNYuyUQHx)

## Features

✨ Seamless integration with WalletConnect v2 and Web3Modal v3 with
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) support.

📦 Provides three template options: Next.js, React, and Vite.

🧱 Supports multiple library options: Wagmi, Ethers.js.

🔧 Supports multiple package managers: Yarn, npm, and pnpm.

## Prerequisites

Before using `create-wc-dapp`, make sure you have the following:

-   Node.js (version 12 or higher)
-   Git

## Usage

To create a new WalletConnect integrated dapp, run the following command:

```
npx create-wc-dapp [options]
```

### Options

-   `-V, --version`: Output the version number of `CREATE-WC-DAPP`.
-   `-i, --install`: Install project dependencies after creating the project.
-   `-id, --project-id <projectId>`: Enter your project ID from
    [https://cloud.walletconnect.com](https://cloud.walletconnect.com).
-   `-t, --template <template>`: Select a template to use for your WalletConnect
    dApp. Available choices: "nextjs", "react", "vite".
-   `-p, --package-manager <packageManager>`: Select a package manager to use
    for your WalletConnect dapp. Available choices: "yarn", "npm", "pnpm".
-   `-l, --library <library>`: Select a library to use for your WalletConnect.
    Available choices: "wagmi", "ethers".
-   `-y, --use-default`: Use default options for all prompts.
-   `-h, --help`: Display the help screen for the command.

Note: Although options can be passed to `create-wc-dapp` via the command line,
you can also use the interactive prompts to select your options.

## Running Locally

To run the CLI locally, clone the repository and install the dependencies:

```bash
git clone https://github.com/WalletConnect/create-wc-dapp.git
cd create-wc-dapp
yarn
```

Then, run the following command to start `create-wc-dapp`:

```
yarn dev
```

## License

This project is licensed under the [MIT](LICENSE) license.

---

**Note**: This README file is a general overview of `create-wc-dapp`. For more
detailed information, usage examples, and troubleshooting, please refer to the
documentation and source code available on the
[GitHub repository](https://github.com/walletconnect/create-wc-dapp).
