import "./index.css";
import "./home.css";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5";

const chains = [1, 137, 43114, 42161, 56, 10, 100, 250];
const projectId = import.meta.env.VITE_PROJECT_ID || "";

const metadata = {
	name: "Vanilla Starter Template",
	description: "A Vanilla starter template with Web3Modal v3 + Wagmi",
	url: "https://web3modal.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const ethersConfig = defaultConfig({ metadata });

createWeb3Modal({ ethersConfig, projectId, chains });

// UI Toggle Code

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
