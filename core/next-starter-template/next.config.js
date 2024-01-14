/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
};

module.exports = nextConfig;

module.exports = {
	images: {
	  remotePatterns: [
		{
		  protocol: 'https',
		  hostname: 'assets.codepen.io',
		  port: '',
		  pathname: '/6238486/gscx-logo.png',
		},
	  ],
	},
  }
