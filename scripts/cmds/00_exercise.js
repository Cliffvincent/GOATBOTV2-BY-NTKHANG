const axios = require('axios');

module.exports = {
	config: {
		name: 'exerciseinfo',
		aliases: ["exercises", "exercise"],
		version: '1.0',
		author: 'JV Barcenas x Void',
		role: 0,
		category: 'Info 📜',
		shortDescription: {
			en: 'Retrieves information'
		},
		longDescription: {
			en: 'Retrieves information about a specified exercise from the Exercise API.'
		},
		guide: {
			en: `Guide: 
			abdominals, abductors, adductors,
			biceps,
			calves,
			chest,
			forearms,
			glutes,
			hamstrings,
			lats,
			lower_back,
			middle_back,
			neck,
			quadriceps,
			traps,
			triceps`
		}
	},
	onStart: async function ({ api, event, args }) {
		try {
			// Check if the user provided an exercise
			if (!args[0]) {
				const guideMessage = `
					Guide: 
					abdominals,
					abductors,
					adductors,
					biceps,
					calves,
					chest,
					forearms,
					glutes,
					hamstrings,
					lats,
					lower_back,
					middle_back,
					neck,
					quadriceps,
					traps,
					triceps
				`;
				api.sendMessage(guideMessage, event.threadID);
				return;
			}

			const exercise = args[0];
			const apiUrl = `https://exercise-api.dreamcorps.repl.co/api/exercises?exercise=${exercise}`;

			const response = await axios.get(apiUrl);

			if (response.status !== 200 || !response.data || response.data.length === 0) {
				throw new Error('Invalid or missing response from Exercise API');
			}

			const exercises = response.data;

			const randomIndex = Math.floor(Math.random() * exercises.length);
			const randomExercise = exercises[randomIndex];

			const {
				name,
				type,
				muscle,
				equipment,
				difficulty,
				instructions
			} = randomExercise;

			const message = `
				🏋️ 𝗘𝘅𝗲𝗿𝗰𝗶𝘀𝗲 » ${name}
🌀 𝗧𝘆𝗽𝗲 » ${type}
💪 𝗠𝘂𝘀𝗰𝗹𝗲 » ${muscle}
🔧 𝗘𝗾𝘂𝗶𝗽𝗺𝗲𝗻𝘁 » ${equipment}
📊 𝗗𝗶𝗳𝗳𝗶𝗰𝘂𝗹𝘁𝘆 » ${difficulty}\n✧⋄⋆⋅⋆✧⋆⋅⋆⋄✧⋄⋆⋅⋆✧⋆⋅⋆⋄✧\n📜 𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗶𝗼𝗻𝘀 »: ${instructions}
			`;

			const messageID = await api.sendMessage(message, event.threadID);
			if (!messageID) {
				throw new Error('Failed to send message');
			}

			console.log(`Sent exercise information with message ID ${messageID}`);
		} catch (error) {
			console.error(`Failed to send exercise information: ${error.message}`);
			api.sendMessage('Sorry, something went wrong while trying to retrieve exercise information. Please try again later.', event.threadID);
		}
	}
};