const JavaScriptObfuscator = require('javascript-obfuscator');

module.exports = {
	config: {
		name: "ob",
		aliases: ["obfuscate"],
		author: "kshitiz",//by cliff  
		version: "2.0",
		cooldowns: 5,
		role: 0,
		shortDescription: {
			en: ""
		},
		longDescription: {
			en: "obfuscate js code"
		},
		category: "TOOL",
		guide: {
			en: "{p}ob code"
		}
	},
	onStart: async function ({ api, event, args }) {

		if (args.length === 0) {

			api.sendMessage(` invalid to use please use {p}ob and JavaScript code`, event.threadID, event.messageID);
			return;
		}


		const obfuscationResult = JavaScriptObfuscator.obfuscate(
			args.join(" "),
			{
				compact: false,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 1,
				deadCodeInjection: false,
				deadCodeInjectionThreshold: 0.4,
				debugProtection: false,
				debugProtectionInterval: 0,
				disableConsoleOutput: false,
				domainLock: [],
				domainLockRedirectUrl: 'about:blank',
				forceTransformStrings: [],
				identifierNamesCache: null,
				identifierNamesGenerator: 'hexadecimal',
				identifiersDictionary: [],
				identifiersPrefix: '',
				ignoreImports: false,
				inputFileName: '',
				log: false,
				numbersToExpressions: true,
				optionsPreset: 'default',
				renameGlobals: false,
				renameProperties: false,
				renamePropertiesMode: 'safe',
				reservedNames: [],
				reservedStrings: [],
				seed: 0,
				selfDefending: false,
				simplify: true,
				sourceMap: false,
				sourceMapBaseUrl: '',
				sourceMapFileName: '',
				sourceMapMode: 'separate',
				sourceMapSourcesMode: 'sources-content',
				splitStrings: true,
				splitStringsChunkLength: 10,
				stringArray: true,
				stringArrayCallsTransform: true,
				stringArrayCallsTransformThreshold: 0.5,
				stringArrayEncoding: [],
				stringArrayIndexesType: ['hexadecimal-number'],
				stringArrayIndexShift: true,
				stringArrayRotate: true,
				stringArrayShuffle: true,
				stringArrayWrappersCount: 1,
				stringArrayWrappersChainedCalls: true,
				stringArrayWrappersParametersMaxCount: 2,
				stringArrayWrappersType: 'variable',
				stringArrayThreshold: 1,
				target: 'browser',
				transformObjectKeys: false,
				unicodeEscapeSequence: false
			}
		);

		api.sendMessage(obfuscationResult.getObfuscatedCode(), event.threadID, event.messageID);
	}
};