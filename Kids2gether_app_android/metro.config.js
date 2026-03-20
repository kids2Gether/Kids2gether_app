// Metro config for Expo SDK
const { getDefaultConfig } = require('expo/metro-config');
const fs = require('fs');
const path = require('path');

const config = getDefaultConfig(__dirname);
const realRoot = fs.realpathSync(__dirname);

if (realRoot.toLowerCase() !== __dirname.toLowerCase()) {
	config.watchFolders = [...(config.watchFolders || []), realRoot];
	config.resolver.nodeModulesPaths = [
		path.join(__dirname, 'node_modules'),
		path.join(realRoot, 'node_modules'),
	];
}

module.exports = config;
