import "./index.css";
import "./home.css";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import { configureChains, createConfig } from "@wagmi/core";
import { arbitrum, mainnet, polygon } from "@wagmi/core/chains";

const chains = [arbitrum, mainnet, polygon];
const projectId = import.meta.env.VITE_PROJECT_ID || "";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, version: 1, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3modal = new Web3Modal({ projectId }, ethereumClient);

const networkSwitchContainer = document.getElementById(
	"network-switch-container"
);
const connectContainer = document.getElementById("connect-button-container");
const networkSwitch = document.getElementById("network-switch");
const connect = document.getElementById("connect-button");
const backdrop = document.getElementById("backdrop");

const toggleNetworkSwitch = () => {
	if (networkSwitchContainer) {
		if (networkSwitchContainer.classList.contains("highlightSelected")) {
			hideBackdrop();
		} else {
			showBackdrop();
		}
		networkSwitchContainer.classList.add("highlightSelected");
	}
	if (connectContainer) {
		connectContainer.classList.remove("highlightSelected");
	}
};

const toggleConnect = () => {
	if (connectContainer) {
		if (connectContainer.classList.contains("highlightSelected")) {
			hideBackdrop();
		} else {
			showBackdrop();
		}
		connectContainer.classList.toggle("highlightSelected");
	}
	if (networkSwitchContainer) {
		networkSwitchContainer.classList.remove("highlightSelected");
	}
};

const showBackdrop = () => {
	if (backdrop) {
		backdrop.style.opacity = "1";
	}
};

const hideBackdrop = () => {
	if (backdrop) {
		backdrop.style.opacity = "0";
	}
};

const closeAll = () => {
	if (networkSwitchContainer) {
		networkSwitchContainer.classList.remove("highlightSelected");
	}
	if (connectContainer) {
		connectContainer.classList.remove("highlightSelected");
	}
	hideBackdrop();
};

if (networkSwitch) {
	networkSwitch.addEventListener("click", toggleNetworkSwitch);
}

if (connect) {
	connect.addEventListener("click", toggleConnect);
}

if (networkSwitchContainer) {
	networkSwitchContainer.addEventListener("click", closeAll);
}

if (connectContainer) {
	connectContainer.addEventListener("click", closeAll);
}
