module.exports = {
	config: {
		name: "ugly",
		version: "1.0",
		author: "Samir",
		role: 0,
		category: "fun",
		guide: {
			vi: "Just For Fun",
			en: "Calculate Your Uglyness"
		} 
	},

	onStart: async function ({ api, event }) {
			const data = ["You Are 1% Fucking Ugly🥺", "You Are 2% Fucking Ugly🥺", "You Are 3% Fucking Ugly🥺", "You Are 4% Fucking Ugly🥺", "You Are 5% Fucking Ugly🥺", "You Are 6% Fucking Ugly🥺", "You Are 7% Fucking Ugly🥺", "You Are 8% Fucking Ugly🥺", "You Are 9% Fucking Ugly🥺", "You Are 10% Fucking Ugly🥺", "You Are 11% Fucking Ugly🥺", "You Are 12% Fucking Ugly🥺", "You Are 13% Fucking Ugly🥺", "You Are 14% Fucking Ugly🥺", "You Are 15% Fucking Ugly🥺", "You Are 16% Fucking Ugly🥺", "You Are 17% Fucking Ugly🥺", "You Are 18% Fucking Ugly🥺", "You Are 19% Fucking Ugly🥺", "You Are 20% Fucking Ugly🥺", "You Are 21% Fucking Ugly🥺", "You Are 22% Fucking Ugly🥺", "You Are 23% Fucking Ugly🥺", "You Are 24% Fucking Ugly🥺", "You Are 25% Fucking Ugly🥺", "You Are 26% Fucking Ugly🥺", "You Are 27% Fucking Ugly🥺", "You Are 28% Fucking Ugly🥺", "You Are 29% Fucking Ugly🥺", "You Are 30% Fucking Ugly🥺", "You Are 31% Fucking Ugly🥺", "You Are 32% Fucking Ugly🥺", "You Are 33% Fucking Ugly🥺", "You Are 34% Fucking Ugly🥺", "You Are 35% Fucking Ugly🥺", "You Are 36% Fucking Ugly🥺", "You Are 37% Fucking Ugly🥺", "You Are 38% Fucking Ugly🥺", "You Are 39% Fucking Ugly🥺", "You Are 40% Fucking Ugly🥺", "You Are 41% Fucking Ugly🥺", "You Are 42% Fucking Ugly🥺", "You Are 43% Fucking Ugly🥺", "You Are 44% Fucking Ugly🥺", "You Are 45% Fucking Ugly🥺", "You Are 46% Fucking Ugly🥺", "You Are 47% Fucking Ugly🥺", "You Are 48% Fucking Ugly🥺", "You Are 49% Fucking Ugly🥺", "You Are 50% Fucking Ugly🥺", "You Are 51% Fucking Ugly🥺", "You Are 52% Fucking Ugly🥺", "You Are 53% Fucking Ugly🥺", "You Are 54% Fucking Ugly🥺", "You Are 55% Fucking Ugly🥺", "You Are 56% Fucking Ugly🥺", "You Are 57% Fucking Ugly🥺", "You Are 58% Fucking Ugly🥺", "You Are 59% Fucking Ugly🥺", "You Are 60% Fucking Ugly🥺", "You Are 61% Fucking Ugly🥺", "You Are 62% Fucking Ugly🥺", "You Are 63% Fucking Ugly🥺", "You Are 64% Fucking Ugly🥺", "You Are 65% Fucking Ugly🥺", "You Are 66% Fucking Ugly🥺", "You Are 67% Fucking Ugly🥺", "You Are 68% Fucking Ugly🥺", "You Are 69% Fucking Ugly🥺", "You Are 70% Fucking Ugly🥺", "You Are 71% Fucking Ugly🥺", "You Are 72% Fucking Ugly🥺", "You Are 73% Fucking Ugly🥺", "You Are 74% Fucking Ugly🥺", "You Are 75% Fucking Ugly🥺", "You Are 76% Fucking Ugly🥺", "You Are 77% Fucking Ugly🥺", "You Are 78% Fucking Ugly🥺", "You Are 79% Fucking Ugly🥺", "You Are 80% Fucking Ugly🥺", "You Are 81% Fucking Ugly🥺", "You Are 82% Fucking Ugly🥺", "You Are 83% Fucking Ugly🥺", "You Are 84% Fucking Ugly🥺", "You Are 85% Fucking Ugly🥺", "You Are 86% Fucking Ugly🥺", "You Are 87% Fucking Ugly🥺", "You Are 88% Fucking Ugly🥺", "You Are 89% Fucking Ugly🥺", "You Are 90% Fucking Ugly🥺", "You Are 91% Fucking Ugly🥺", "You Are 92% Fucking Ugly🥺", "You Are 93% Fucking Ugly🥺", "You Are 94% Fucking Ugly🥺", "You Are 95% Fucking Ugly🥺", "You Are 96% Fucking Ugly🥺", "You Are 97% Fucking Ugly🥺", "You Are 98% Fucking Ugly🥺", "You Are 99% Fucking Ugly🥺", "You Are 100 Fucking Ugly🥺%",
	];
	return api.sendMessage(`${data[Math.floor(Math.random() * data.length)]}`, event.threadID, event.messageID);
	}
};