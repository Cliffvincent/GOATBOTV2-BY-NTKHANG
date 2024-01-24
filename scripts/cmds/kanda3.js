const axios = require("axios");
const fs = require("fs");
const path = require("path");

let isRandomVideoEnabled = false;
let intervalId;
let sentVideos = [];

module.exports = {
	config: {
		name: "kda3",
		aliases: ["kanda3.0"],
		version: "3.0",
		author: "kshitiz",
		countDown: 30,
		role: 2,
		shortDescription: "",
		longDescription: "get kanda video/ hilake sojaa",
		category: "𝟭𝟴+",
		guide: "{p}{n} on / off",
	},

	onStart: async function ({ api, event, args, message }) {
		const command = args[0];

		if (command === "on") {
			if (isRandomVideoEnabled) {
				api.sendMessage("kanda3.0 is already enabled.", event.threadID, event.messageID);
			} else {
				isRandomVideoEnabled = true;
				api.sendMessage("kanda3.0 is now enabled", event.threadID, event.messageID);
				startSendingRandomVideos(api, event.threadID);
			}
		} else if (command === "off") {
			if (!isRandomVideoEnabled) {
				api.sendMessage("kanda3.0 is already disabled.", event.threadID, event.messageID);
			} else {
				isRandomVideoEnabled = false;
				clearInterval(intervalId);
				api.sendMessage("Kanda3.0 is now disabled.", event.threadID, event.messageID);
			}
		} else {
			api.sendMessage("please Type 'kanda3 on' to start, and 'kanda3 off' to stop.", event.threadID, event.messageID);
		}
	},
};

async function startSendingRandomVideos(api, threadID) {
	intervalId = setInterval(async () => {
		try {
			const video = await getRandomVideo();
			if (video) {
				await api.sendMessage({
					body: "🥵🥵💦",
					attachment: await global.utils.getStreamFromURL(video),
				}, threadID);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}, 30 * 1000); 




}

async function getRandomVideo() {
	const link = [
			"https://drive.google.com/uc?export=download&id=1zgn8EqLKbzCdm9vOCMNJkJg7j4TeYxM_",
			"https://drive.google.com/uc?export=download&id=1zcT3VP2ieQYFFE6jp3s9fE-2a3HVowHH",
			"https://drive.google.com/uc?export=download&id=1yrQPcV1lYUdwHhWgZ_qn3xP5WvsJCFMS",
			"https://drive.google.com/uc?export=download&id=1yOGY1XJs1hUfaHJqm0YktT3t8S-LV8Ty",
			"https://drive.google.com/uc?export=download&id=1xPxhMbDI1UCtg8pRFV0CvbqitZ1JekES",
			"https://drive.google.com/uc?export=download&id=1xJ_gJr3ZVkGyS0BLxAA6tyIWrFUBl-Q4",
			"https://drive.google.com/uc?export=download&id=1wAawROZ6sXDMU1q8a4b3jNJiIpDgeb_D",
			"https://drive.google.com/uc?export=download&id=1w8ESLhu3PuzmrFi99WK0VV8cDmn6mxy9",
			"https://drive.google.com/uc?export=download&id=1w0lydWDNLqJUlRDKKX36O_01D9m-EjC0",
			"https://drive.google.com/uc?export=download&id=1vzQcgjgdOe9iahPdN7AXFcC31VbqdXMf",
			"https://drive.google.com/uc?export=download&id=1vtIjF18wSg_RHr9aeGsjzLgcIjEpEoqN",
			"https://drive.google.com/uc?export=download&id=1vrGryOqznkcgHyuk62_hIzMfPQy2tWyA",
			"https://drive.google.com/uc?export=download&id=1vF7d2nJ6gxifx3Oc-g81R7qMsRxCyopS",
			"https://drive.google.com/uc?export=download&id=1uodmaJd91fPQ0AgiUasttCmxpB8JDdpK",
			"https://drive.google.com/uc?export=download&id=1un3x4VIl-9obcRvJkadNHsLtpRiZFqOw",
			"https://drive.google.com/uc?export=download&id=1udLme09-Y74b-PmVD_fYQcPwq9P-Cxbb",
			"https://drive.google.com/uc?export=download&id=1tyHaXzs_Vx5cSif8eTFZsepTE42TkEth",
			"https://drive.google.com/uc?export=download&id=1twDqdlWakp4BMPK1s_F36L0JIIhMnFCF",
			"https://drive.google.com/uc?export=download&id=1tw7QvCXYxSKZIlCSiMweGaj6ueHesoAV",
			"https://drive.google.com/uc?export=download&id=1tQ7X9uov0qBtZRJT_LBMCAO0pPVe37Nt",
			"https://drive.google.com/uc?export=download&id=1tDEuhrDxeqz67XF03Easc3AwIRVDY5pK",
			"https://drive.google.com/uc?export=download&id=1t2og_RMNXUNlKDQ8S5PVtF7G8lQ3KzxX",
			"https://drive.google.com/uc?export=download&id=1t0wlz6PPcnnvuESQhQquYLq5Bfhdvb_m",
			"https://drive.google.com/uc?export=download&id=1sJ-ZJ9QIPZaiykL6MGKu5r9ZJkpyJc5d",
			"https://drive.google.com/uc?export=download&id=1sCaPnF1YWCiESsoOIrzZSf2IZCdsIdtV",
			"https://drive.google.com/uc?export=download&id=1rtiVVyZuyMi-THlE70dlyo9V5IGAZp7i",
			"https://drive.google.com/uc?export=download&id=1rs17kAoVqEWtyVelBSxyxwjkdhk_yqbS",
			"https://drive.google.com/uc?export=download&id=1rXQX7SLoj9DfBTEvNORU1i56yMntN0ia",
			"https://drive.google.com/uc?export=download&id=1rLjzOdzpv8QwmRU-2LbMixtl94R3HX_6",
			"https://drive.google.com/uc?export=download&id=1r1KQjfaGdAQPcL0O7wS4c9mBX-4XH2cs",
			"https://drive.google.com/uc?export=download&id=1qk-taR7Jc3w_iEw4yK4fVl9JsGG4TWLW",
			"https://drive.google.com/uc?export=download&id=1qYdAsy1NAtFBHDnaj04X-agJzslTXjYy",
			"https://drive.google.com/uc?export=download&id=1qG5r5Q6U6i-hKvIHqpU9yGmoZi6feb3v",
			"https://drive.google.com/uc?export=download&id=1pc_DiMZO1bolEQ5nAoMkGUsJ_-ttM82l",
			"https://drive.google.com/uc?export=download&id=1pVc1rGuB8wrwGv7BgJbN8qXMJhiCeChO",
			"https://drive.google.com/uc?export=download&id=1p2n5kXlPoU72E6YW9eXHilPtuqnG-w6C",
			"https://drive.google.com/uc?export=download&id=1osZ3s7_s2owZxISnM9c84DRYkLS-5bWT",
			"https://drive.google.com/uc?export=download&id=1nTcT8l7AQE5d21_fLF0ni8LO2ebmM1u9",
			"https://drive.google.com/uc?export=download&id=1nECmpEg1J2yIFem7rZqQmuMSquvrvYV_",
			"https://drive.google.com/uc?export=download&id=1mSWF2LSQdsmxxgermoCSy-9oVINFdE6i",
			"https://drive.google.com/uc?export=download&id=1mR6oOhg0QyufpVfB2da73jxUU9dBPwqs",
			"https://drive.google.com/uc?export=download&id=1mN8phGXPc7jOaZHJb5RFaUCK7pPdzS8B",
			"https://drive.google.com/uc?export=download&id=1mCOfefKrpxeaknBkjzBtj3UitZzISY0S",
			"https://drive.google.com/uc?export=download&id=1lsAy8CgYNcv5aLrPf4Q_tD7e9Tfh-voC",
			"https://drive.google.com/uc?export=download&id=1li2eTqIU_6LomKhxb156-RC3X4os3V5q",
			"https://drive.google.com/uc?export=download&id=1kZZnXlW5xMAQpmaWsc3Z4bA36zKQyfCz",
			"https://drive.google.com/uc?export=download&id=1k6la21wsy3_KJGOu8RKyp-8bPJaXr4Tj",
			"https://drive.google.com/uc?export=download&id=1jhqjE616AL5WSMTKjZN6zzeB4hVlr0oP",
			"https://drive.google.com/uc?export=download&id=1jYkjxq_uwhnvsDnFO9QEAhkSlH6_TGUK",
			"https://drive.google.com/uc?export=download&id=1jDa9Mldx7TlkOw7Jdc36KTF7DpIamSwy",
			"https://drive.google.com/uc?export=download&id=1iw3l-eJh9DymutufSay0Z0d2IqvNXSD4",
			"https://drive.google.com/uc?export=download&id=1ieyaB3Dlr_fOf2ihKVD13YrMHiv_bqNe",
			"https://drive.google.com/uc?export=download&id=1i7iUj1druzVKu93xqFkmTjmZTaXMMEES",
			"https://drive.google.com/uc?export=download&id=1hh83e-SWfWuvzXPo4FePvDyOTNOsao_8",
			"https://drive.google.com/uc?export=download&id=1gpEQga__aFID0luhrjOUkbmq8DqnMbQh",
			"https://drive.google.com/uc?export=download&id=1gCe3yfK21oM-X0lL7ZnbWmerXWD_-tNO",
			"https://drive.google.com/uc?export=download&id=1g2YKToFX4mxy-HlY1Xw60gAs3LVWAYFS",
			"https://drive.google.com/uc?export=download&id=11hCS5c0v-_OG7r5NjJOVGhZ0cabIu5m2",
			"https://drive.google.com/uc?export=download&id=1feu0cFCzJ05CTR6CnoUYuVXaWEDhf2eM",
			"https://drive.google.com/uc?export=download&id=1eMrdl1Y2xjOkdM_tzM4Oudo6TCYXeBvr",
			"https://drive.google.com/uc?export=download&id=1eEmPf1z1Gk5jAd-16B6Wbf3OalWAZKIH",
			"https://drive.google.com/uc?export=download&id=1dJPDnJH3_fUHY-Q1zU2miHQb7lHDna8u",
			"https://drive.google.com/uc?export=download&id=1ctZmqgBwkqyLFFfNmemU-3cRKWdrnWd7",
			"https://drive.google.com/uc?export=download&id=1bXwmk9EhNW7ICN0Aj_665ZyfmoId1HYz",
			"https://drive.google.com/uc?export=download&id=1bW0EG_wb_9sihifn9CktRfLADe98VfBE",
			"https://drive.google.com/uc?export=download&id=1bVQvY4abfs9vVR3QzJy2L-2XhviF1n2n",
			"https://drive.google.com/uc?export=download&id=1bGa8ugfYydy2VfBgMMqU7aVhlu2fdhQ3",
			"https://drive.google.com/uc?export=download&id=1ahM2OUubpPxWwo3l9s0oowhfpkU6DEAK",
			"https://drive.google.com/uc?export=download&id=1aQdBIaDXV4Mmu-g8eciQL-oayL6WjCUD",
			"https://drive.google.com/uc?export=download&id=1aLlLvgoWsvC9LhuNAHj1_yNDZIIWl1_w",
			"https://drive.google.com/uc?export=download&id=1aAd9MmQAc8LWhw8jwM3IHktmzK_zqsY3",
			"https://drive.google.com/uc?export=download&id=1_cSEFMwC9Ja9m-F_K8FbYnu0M3BxY81P",
			"https://drive.google.com/uc?export=download&id=1_R_1CWtoT37ZfNt_kIo5YzYJOosTIWhe",
			"https://drive.google.com/uc?export=download&id=1_CX1XryWqa5j07Paw-DivjhBo3m-lTYi",
			"https://drive.google.com/uc?export=download&id=1ZdYxP47it3o2DclzXanukCBpYM7X6ZYt",
			"https://drive.google.com/uc?export=download&id=1Z_pB7Z4P6MlidOEwWLjfAWRvbqCRf9Zu",
			"https://drive.google.com/uc?export=download&id=1YeUQOuIAJeAx5NCFKa4k4ZlgC6Vq573K",
			"https://drive.google.com/uc?export=download&id=1YLhaNLgAJbLXJZk1v7o8zJX4FWXZzt5g",
			"https://drive.google.com/uc?export=download&id=1X3aIx3xqp_cIMW7xXdT550axCIlPh567",
			"https://drive.google.com/uc?export=download&id=1X073GietO1CDwzcgGlgY7fX0kiLn4HGj",
			"https://drive.google.com/uc?export=download&id=1WGG04nMz3vxqHo9-uAbw8frKSF8lKdvb",
			"https://drive.google.com/uc?export=download&id=1VsidwnbyKu81Hfa85jM2AcdB0nlHmY8C",
			"https://drive.google.com/uc?export=download&id=1VqwXpp-6n1cHBhBFNZa5wxbddr4-NMIs",
			"https://drive.google.com/uc?export=download&id=1VjTGP17La9EtOVNFyFPaOadz22dfEA0m",
			"https://drive.google.com/uc?export=download&id=1VZjc5s_lQyZWhYL1ABjsvGUIJN4ykqqy",
			"https://drive.google.com/uc?export=download&id=1VGoCERZniq2c3ud6T8ERXYzkP240USaH",
			"https://drive.google.com/uc?export=download&id=1V6X_WYMe2XAWN48GFdcRg-rKhXxXwle8",
			"https://drive.google.com/uc?export=download&id=1U1mStyzr_NgseOwTra551qc1-5n0YhkY",
			"https://drive.google.com/uc?export=download&id=1T6umdXHpHnolRIQIbd2Zq20qSvapjK4u",
			"https://drive.google.com/uc?export=download&id=1Sx-PaSiFgypZT6WoAi6X_WP5omGPyQho",
			"https://drive.google.com/uc?export=download&id=1Sl6_jdnrca7Z6MNHbOSrTA8G0zCcFMiA",
			"https://drive.google.com/uc?export=download&id=1Se7bkF-7bS_Cxk3KUpaCdQdpCdC8uBHx",
			"https://drive.google.com/uc?export=download&id=1SJktb2SAptNIuqhhgNZuk28n1gHpTRxN",
			"https://drive.google.com/uc?export=download&id=1SFbJet4vnFWYtl3Mkke5bwwM1Ktni1Yp",
			"https://drive.google.com/uc?export=download&id=1RFYeK2urR5AA4LHg6tNk_8GA_CHQlvFR",
			"https://drive.google.com/uc?export=download&id=1QqeJn5LGQGt3L2tyixD7K2rYHZwFEZdo",
			"https://drive.google.com/uc?export=download&id=1QZ0Ab11gZucHhdWIWgPkadoXUjm9wG02",
			"https://drive.google.com/uc?export=download&id=1QDDzZVWmzzMUhbxl1oQvZrNo2FHakEB3",
			"https://drive.google.com/uc?export=download&id=1PyN8WekyrlQ8U9j4TOV3AGeXz1Np5BxH",
			"https://drive.google.com/uc?export=download&id=1PjNV9IEATgnazBNVuU-r_mbCNfmtVCpP",
			"https://drive.google.com/uc?export=download&id=1PXkg-JMtTz0reNVUNjW6wP-daKUesvHH",
			"https://drive.google.com/uc?export=download&id=1PWvbJhr0vixWMbgYX6FuXTY2u1fEpylE",
			"https://drive.google.com/uc?export=download&id=1P8ZTOFI3sjM4yai5TyE_FO4u11yuEoGG",
			"https://drive.google.com/uc?export=download&id=1Ozc8p4GqRdD4rTNWXSuKCkjiez0JmHS-",
			"https://drive.google.com/uc?export=download&id=1OibV459bAexoQ0kInXIVdU9sRyEtYcm6",
			"https://drive.google.com/uc?export=download&id=1OaVeQ6aVRDXDg-fvxxGTcsvqXElBZQKO",
			"https://drive.google.com/uc?export=download&id=1NbcZV59uxZFofm0spC3eTa7-GUkysqtr",
			"https://drive.google.com/uc?export=download&id=1NZrmv8RwBzM0rncfaSlNDqWHaYIH5bjr",
			"https://drive.google.com/uc?export=download&id=1NH4bxpI-wcw2_A4jpL7gK99KHeP5ISJ5",
			"https://drive.google.com/uc?export=download&id=1MK3jYdONv08ugXz4E1TWJJ7GkC1ldFkx",
			"https://drive.google.com/uc?export=download&id=1MELfFHas9-3NiOWAdGCqGVmO3prxLydx",
			"https://drive.google.com/uc?export=download&id=1LnzfzkYmWjoCTYGqY00yiZBGQ3oKqqwB",
			"https://drive.google.com/uc?export=download&id=1LWD3I9jI0lFZ6AUfGAIavQq7RrSnZv_L",
			"https://drive.google.com/uc?export=download&id=1LULRk5KayOzKFaeRVTGFY7L7UBxwzN5B",
			"https://drive.google.com/uc?export=download&id=1L-9Z1dGeVix2tofgsGATmgFBuYgjoDZ9",
			"https://drive.google.com/uc?export=download&id=1KQYD7uKKjSshMJtRfvNLgmmJF81hHto7",
			"https://drive.google.com/uc?export=download&id=1K7RakrPgGIdbc-x8LcafIgfXPtjkWlUz",
			"https://drive.google.com/uc?export=download&id=1JfKfmBzR5X-c5DUMCvafdVT4_GHP4niz",
			"https://drive.google.com/uc?export=download&id=1IrpC3lcinViYjkUV59T59l3JttsLJGU7",
			"https://drive.google.com/uc?export=download&id=1IZes79HEskGty7pTdzrHDzlnXdo7SEGz",
			"https://drive.google.com/uc?export=download&id=1G6UHuDdOn4kz8WjiszS05ahx1ImksNYW",
			"https://drive.google.com/uc?export=download&id=1FR9tZpxhXVXoTTEXbxkMtY5ec8F0Bmb3",
			"https://drive.google.com/uc?export=download&id=1E-lP2O70w3Kd31a6EJ8IkyZ-VMZ8T7_0",
			"https://drive.google.com/uc?export=download&id=1CIYs_IWxdCEot7Niapy-zIGQGG6rLAv5",
			"https://drive.google.com/uc?export=download&id=1BCM6yb5-AbqQwSx5xGcvhQqgATvX_daX",
			"https://drive.google.com/uc?export=download&id=1Akif9IyNVSy1XHqGI1ZtOmkd7vwW9lgA",
			"https://drive.google.com/uc?export=download&id=1AMVWPuVBS0i41oOZgzkd5-cPAaoS2SCU",
			"https://drive.google.com/uc?export=download&id=1A6AlAnlOXwJa7BO2l13KjqOfX1XMX5FC",
			"https://drive.google.com/uc?export=download&id=1A1RLT5Q8LPyLC8YTAvVQoxepN5KfwM1l",
			"https://drive.google.com/uc?export=download&id=19s8URxBkU1Y8Zpn4Y1fUVegR280Bim67",
			"https://drive.google.com/uc?export=download&id=19iu1QZ6mU-18229D4oIjEvBWsO5puAKO",
			"https://drive.google.com/uc?export=download&id=19At_b2zuSuRz6qT8eo9GJSBib7w3R7eB",
			"https://drive.google.com/uc?export=download&id=18D5EsKIzEM9tPQd_ynXog8KmRryIeIhL",
			"https://drive.google.com/uc?export=download&id=17tTFf9iFXpRHrQJV0bEoOo4Vyt7LpUt-",
			"https://drive.google.com/uc?export=download&id=17dOAj1jaclfG4YBduGUWUG2aAaX0gnbZ",
			"https://drive.google.com/uc?export=download&id=17CTjAklnrSGKoEiVfS1wjjNT-eb9g58U",
			"https://drive.google.com/uc?export=download&id=173a2Sy4W6lGXCHmkYUjDj-vvWhde2HF6",
			"https://drive.google.com/uc?export=download&id=16sNFU9sCOJXoPwA0bvxFQHJhRQ624A3a",
			"https://drive.google.com/uc?export=download&id=16S00dhI-PR9kzN79TXa5OiX31lWmJy9N",
			"https://drive.google.com/uc?export=download&id=16M4EXByXZsPzVBOgUmI6TvhtCmKbbp6A",
			"https://drive.google.com/uc?export=download&id=16KZGwWK2FKaziPbY1_CChk91e7svYmdi",
			"https://drive.google.com/uc?export=download&id=161cFt63qVUclCv8jLvEs7dDTeowI75de",
			"https://drive.google.com/uc?export=download&id=15nsmYZeLsXzdeo9nc_uj4mtpbqsMwMi4",
			"https://drive.google.com/uc?export=download&id=14lYOQpcYwjhfJBOVxQ7PfkRU2fL1xTF0",
			"https://drive.google.com/uc?export=download&id=14cCOcMbPxwrdmUjhBmOd6GaDZ0VSCspC",
			"https://drive.google.com/uc?export=download&id=14Cs1avLvoqI1EZSulbUS8XNONJhWHzSQ",
			"https://drive.google.com/uc?export=download&id=136D_JGrC3QeokCIU2KDHUcHfF-qBcufF",
			"https://drive.google.com/uc?export=download&id=130MQjiS5viDEFS_Sl1yov98lrmoMfRUN",
			"https://drive.google.com/uc?export=download&id=12ywSqXyZxeZsGwGMrTW2IP509Bu-Bt1-",
			"https://drive.google.com/uc?export=download&id=12R0ZCuq9ssgJ_tETlU5NMvL989rKUjle",
			"https://drive.google.com/uc?export=download&id=12AKtX0jtqxbUREBynXr9q9JmxgamXtDw",
			"https://drive.google.com/uc?export=download&id=11sHJIRWHUA98xzavwXgs7cWYcVmAd1W5",
			"https://drive.google.com/uc?export=download&id=11Fhca3yBESvxXsF_DWQTzgCRMIesEqLn",
			"https://drive.google.com/uc?export=download&id=10hJFNS0iRE0UfacbwwjzqF2bqBlOf18m",
			"https://drive.google.com/uc?export=download&id=10dGhJlL4SJpLVs94zK5fqfnK7QvQ5zKJ",
			"https://drive.google.com/uc?export=download&id=1-4-QV0i1n570wlwsOmO2Q6bSEJ8F6iky",
			"https://drive.google.com/uc?export=download&id=1-Ye4qxnoda72o4hMIDJZ1pVh7xK3tQ1a",
			"https://drive.google.com/uc?export=download&id=1-29MoDYL1q_ANN_R_QH-o1yEFrNAOyzQ",
			"https://drive.google.com/uc?export=download&id=1-gJdG8bxmZLyOC7-6E4A5Hm95Q9gWIPO",
			"https://drive.google.com/uc?export=download&id=1-ryNR8j529EZyTCuMur9wmkFz4ahlv-f",
			"https://drive.google.com/uc?export=download&id=1-vHh7XBtPOS3s42q-s8s30Bzsx2u6czu",
			"https://drive.google.com/uc?export=download&id=11IUd-PDHozLmh_RtvSf0S-f3G6wut1ZT",
			"https://drive.google.com/uc?export=download&id=12YCqZovJ8sVZZZTDLu8dv8NAwsMGfqiB",
			"https://drive.google.com/uc?export=download&id=12eIiCYpd_Jm8zIVRSkqlSt7W-7OsxB6g",
			"https://drive.google.com/uc?export=download&id=13utWruipZ_3fR0QSMtGMnFjGt3bthnbf",
			"https://drive.google.com/uc?export=download&id=14GYNaYL-pkEh3UH0oIUXVamru5h830DY",
			"https://drive.google.com/uc?export=download&id=14UGb2fH4wyUbVSQ-Vt5yf-4sH3-icXGC",
			"https://drive.google.com/uc?export=download&id=161O9_EbCQJ8nHTT7VeE7BWtHvEjHAT4k",
			"https://drive.google.com/uc?export=download&id=170YWB4jpMfR5GpmPb_Lymh6OmrmWDE0x",
			"https://drive.google.com/uc?export=download&id=17nvXNBpMWVmuWLK-kkLzkbrbpW43rD4r",
			"https://drive.google.com/uc?export=download&id=17w7sehThOv6IRrcsLboi7Zk6zZvfBHr5",
			"https://drive.google.com/uc?export=download&id=17yaPd3PoYJkuL0IEZHzcBic9pX4AmGiK",
			"https://drive.google.com/uc?export=download&id=18Dyc1vkysNhHSGi5OYpa6AzD5rk3_vkf",
			"https://drive.google.com/uc?export=download&id=18brau5aYmiMAxfhDTLz_nFWuIcb_mja5",
			"https://drive.google.com/uc?export=download&id=19GcLpOzFYypYFu1FboQyVjWxC9Jh3JC5",
			"https://drive.google.com/uc?export=download&id=19lKQChg0hv2MOTphkyI4zTiUIxuujd03",
			"https://drive.google.com/uc?export=download&id=1AjrBOBRWKpKjLOYV1oof2mVZBzx0ebgD",
			"https://drive.google.com/uc?export=download&id=1BPOEwIt7lGv66w5pUTDU937q4i5ym5S_",
			"https://drive.google.com/uc?export=download&id=1C-VxCoO5gMKCq2rg7PxjlitK4bOg7pt2",
			"https://drive.google.com/uc?export=download&id=1C9t9VNpLT9DelBeDnbFNjdAA0tK_cXh-",
			"https://drive.google.com/uc?export=download&id=1DrhAOOeYIHlTWJU5e26OMjO0R5nueyf7",
			"https://drive.google.com/uc?export=download&id=1Dz7UfOejW9rDFYFAtxmAq_ncv04WaTTL",
			"https://drive.google.com/uc?export=download&id=1EcBmrdqYfQbwSPr2kiKY2QV_6CXLJJj6",
			"https://drive.google.com/uc?export=download&id=1F5Xc5Qff4RGyUuHzuqPfmOn2EZKQIn7P",
			"https://drive.google.com/uc?export=download&id=1FTxkmgt2sWf8U2h8a5HszyKINMr6Gnwm",
			"https://drive.google.com/uc?export=download&id=1Frf4GUg26Abw2lJdQ_RHycNhDMZXfMm2",
			"https://drive.google.com/uc?export=download&id=1FtdiGL244Kcj7tiA6F_2mKeTmMpVCyjr",
			"https://drive.google.com/uc?export=download&id=1G2tE1VdFzzqochfGwXwc46nuwkTeRRSc",
			"https://drive.google.com/uc?export=download&id=1GB6VOhgA3-JUSUZ3D1xgjlKH1Jswy0Z4",
			"https://drive.google.com/uc?export=download&id=1G_04XtbUP-QZNWFzdLohwY_w6BRdmijk",
			"https://drive.google.com/uc?export=download&id=1GpvlwryNcsRz2i6VYEV3NqSLr0WtGGn_",
			"https://drive.google.com/uc?export=download&id=1HYn-ZCVB0JcipKWrMxPnSrAVP4oSjePT",
			"https://drive.google.com/uc?export=download&id=1H_5i2V6W8Fl0N5QIKPACEUcljd8-q_dT",
			"https://drive.google.com/uc?export=download&id=1HhFPMOMXI7DDKc371C-12A0yfC0101x7",
			"https://drive.google.com/uc?export=download&id=1JNRfPMJe1_SodueqhMVf4so0-vjWaK9V",
			"https://drive.google.com/uc?export=download&id=1Jjy85bIGE9efsUIlmHykEistAquEB9oT",
			"https://drive.google.com/uc?export=download&id=1JoXCYZz4YoKpWe809ttUaaSsJdsCJZNf",
			"https://drive.google.com/uc?export=download&id=1Ko-ScBYddulpKX4I4xS7BRkndIaZZ3gT",
			"https://drive.google.com/uc?export=download&id=1LU4PTBFjWlhgzP2HiiJX_Esw2iIq7Zpj",
			"https://drive.google.com/uc?export=download&id=1LaM2kIlZUdA_UbCzX8s92nxcqEJieHLN",
			"https://drive.google.com/uc?export=download&id=1LcClA0b5Qih_tIv_wVRUsWX9gk3bVmzj",
			"https://drive.google.com/uc?export=download&id=1LgVpbMhe0CXM7rIUr9pJNK46QtZcpRtK",
			"https://drive.google.com/uc?export=download&id=1MB-KTUmPMkSb1o4J_EIRQ8mJ3w-cUOtY",
			"https://drive.google.com/uc?export=download&id=1M_cHjSaNWT5b_8p9VSPmzVyz-rqBqo3S",
			"https://drive.google.com/uc?export=download&id=1NC3fFj68PqqvZeg67AdA_cHyNdOBlRfF",
			"https://drive.google.com/uc?export=download&id=1Nk534yO5owt7IaMOKjbT6IGLGW96Gv0f",
			"https://drive.google.com/uc?export=download&id=1O1Cej8MFdytRun3RmGTnmT6uk1T-Zcmu",
			"https://drive.google.com/uc?export=download&id=1O801cupSBdjgkEHcRj9gZgyj2UVbyBZ_",
			"https://drive.google.com/uc?export=download&id=1OZUKqC7ooU572Vice1a0w3O3qRbC1F-r",
			"https://drive.google.com/uc?export=download&id=1P36Avho0fdTGnIm--wsIbSXqvTtaNbGA",
			"https://drive.google.com/uc?export=download&id=1PU4U-VHzWzZ_3chEOUdUJOeOj_8QTC19",
			"https://drive.google.com/uc?export=download&id=1Q-ZiZE9B1nADleloUlZPk9Yt2UcT9Jli",
			"https://drive.google.com/uc?export=download&id=1Q6ZlUc7gYbKng2T5BW8ihDXSohNVvl9i",
			"https://drive.google.com/uc?export=download&id=1QS5LbZmGXsHynBSVP2eNMBctjp7i8Veh",
			"https://drive.google.com/uc?export=download&id=1QoegqFfHWnaSRimcwZouya7xM9aIYOLO",
			"https://drive.google.com/uc?export=download&id=1RFtXmVTzPt6LkpX2q_2co9_-lpKI5czZ",
			"https://drive.google.com/uc?export=download&id=1Rtx9IpniEP0RQ8cREvf4q5OjoBvlxlVd",
			"https://drive.google.com/uc?export=download&id=1RwR0hE9oroYy1r92qySPSFbddsBdnGZd",
			"https://drive.google.com/uc?export=download&id=1TAshp38cUnJ0bQxSnlur_srBG-iSmhKZ",
			"https://drive.google.com/uc?export=download&id=1V5IB7_yn1mPhgnY15Zqo7hl6_ypAj-c_",
			"https://drive.google.com/uc?export=download&id=1VdwLFjOyTX0n5UwyqMtC8_xnwVCEFx3Y",
			"https://drive.google.com/uc?export=download&id=1Wja3iI8LALkZs_XIMLRziTrcPGMipAvW",
			"https://drive.google.com/uc?export=download&id=1X84nddHJ-_4Lc6p9Hj-IXaBmwVkx4alc",
			"https://drive.google.com/uc?export=download&id=1Xw8Mxk3RJJ3Rc1wCZiRg5oKGRN4e_l2L",
			"https://drive.google.com/uc?export=download&id=1Y34gETXZwRBXf60nYOyDNjMEb3GcHw_p",
			"https://drive.google.com/uc?export=download&id=1Z8fRrmLaq2VopeJDxBRyB6m6Aupq38Fw",
			"https://drive.google.com/uc?export=download&id=1ZHd4NUAaWrlyvysQ1VnfkeexlK2t3u46",
			"https://drive.google.com/uc?export=download&id=1ZW_b6EQ4DQI-hSFw3wJeekaSuL-CTt-X",
			"https://drive.google.com/uc?export=download&id=1ZWnRry0HcXUAkeqvEHR51ukzVMWP4q1j",
			"https://drive.google.com/uc?export=download&id=1_7LZ4go5LMgWvRPoKJIku0_Tz3rxdgS-",
			"https://drive.google.com/uc?export=download&id=1_8uTqb3XQcKdLxg-kCPose2zizbjuEfh",
			"https://drive.google.com/uc?export=download&id=1a3nlk9nFVQ4UHNpXzxWZWz1kzcVW2q3f",
			"https://drive.google.com/uc?export=download&id=1ajf90OK-R27jrqJ_ot8O6bCdtQn8PYo0",
			"https://drive.google.com/uc?export=download&id=1auj8r7iOzIAfxhH0GI9JvuYaPxFs6Or3",
			"https://drive.google.com/uc?export=download&id=1b6O6LdfitQLU5o8YnyOUjRP422eE9qwA",
			"https://drive.google.com/uc?export=download&id=1bZIPoHp6UcMXHIISvA0PNirfnQGN0Fdp",
			"https://drive.google.com/uc?export=download&id=1cDyFQ9BfrqKZH1AYgjT9DDxpR7pTcKVI",
			"https://drive.google.com/uc?export=download&id=1e9Ut8dt4BpEwEoaIbh_4ktCY8pLm_90R",
			"https://drive.google.com/uc?export=download&id=1eBj_m0bsySjUcsJEm8DJ-zGaq9tI3gK4",
			"https://drive.google.com/uc?export=download&id=1eEaIBikLu5kwOw3U3xmowlu7TxNFCYGG",
			"https://drive.google.com/uc?export=download&id=1fltQlOK7O4hBNjzqFrhTcZkkalyX-xtP",
			"https://drive.google.com/uc?export=download&id=1iCgSIdDe3OAlbLfHj9MOM5r4p2wJ3IVX",
			"https://drive.google.com/uc?export=download&id=1iDsDpwRTyqVtlkK1cr2yCmX9RWBqro83",
			"https://drive.google.com/uc?export=download&id=1ilsbQ41h27oYFLTkF7DGh5E1y87Fb4Li",
			"https://drive.google.com/uc?export=download&id=1kvPCFpazUyG4kweLotGo4MBOV6ITbDhO",
			"https://drive.google.com/uc?export=download&id=1l-F5zFd9n3xkpNVQVfEQ1QY5Qk0vSuRP",
			"https://drive.google.com/uc?export=download&id=1lHlClK9_bIsIg4GZXTmtcD2uL7HCBidC",
			"https://drive.google.com/uc?export=download&id=1ldhd9bDe5P7dr5IjRSFNw7_p4-T-bUHq",
			"https://drive.google.com/uc?export=download&id=1lgy4CM0dZTgUQe97cHv8ckI-TH1fEdDA",
			"https://drive.google.com/uc?export=download&id=1mr8XTjOfylN4RU8qHQGGLpdBhD9u1922",
			"https://drive.google.com/uc?export=download&id=1mviQxG7P__nj6pzHykEdOxLERwIJCp8E",
			"https://drive.google.com/uc?export=download&id=1pMNK9J3016kHBePSN0yr0QnDSifDlmvX",
			"https://drive.google.com/uc?export=download&id=1q6BysXVGDKrkoV9cLsdtJf37bkCSpxYf",
			"https://drive.google.com/uc?export=download&id=1qOB3u_06QrNcaKcJrnH27db5gplNCv8n",
			"https://drive.google.com/uc?export=download&id=1qWNdqTwOrc7RJUqgHO9vnC_zWqhobg-8",
			"https://drive.google.com/uc?export=download&id=1qZGH73eGzBngq6tzHtm9ssc3nHRG7gdP",
			"https://drive.google.com/uc?export=download&id=1rGfGZT9gu5H9ABnHN5ekXIb7600gFm9d",
			"https://drive.google.com/uc?export=download&id=1rLAG_cGzBAYE1l2OZCs8tdRtCHFpBmz9",
			"https://drive.google.com/uc?export=download&id=12Q0PJAVmHVgsRF7akn3PNRru-tepia5y",
			"https://drive.google.com/uc?export=download&id=1rULVaU0D727BpFK2Rzuw5quMrYXQuT6T",
			"https://drive.google.com/uc?export=download&id=1s3qb7YOWbuy3yRD9TPyCKVolT15MECKe",
			"https://drive.google.com/uc?export=download&id=1s3qb7YOWbuy3yRD9TPyCKVolT15MECKe",
			"https://drive.google.com/uc?export=download&id=1soaiC_lLQboDwSeIJpse6diMEpcvXQv-",
			"https://drive.google.com/uc?export=download&id=1sxPeSpyIXO-hitBSGElJBzasuSOJXVM4",
			"https://drive.google.com/uc?export=download&id=1vg49E9Hw4w56CSISINZH_ZSQRSIfCVHN",
			"https://drive.google.com/uc?export=download&id=1vmZKmjJmgsDSbtlUqIRCa1rNjKzq_B9v",
			"https://drive.google.com/uc?export=download&id=1woxnScrA2ADpZnTQeQt3tidrXDVGN6Z-",
			"https://drive.google.com/uc?export=download&id=1x164E3sV32WaeduO14BbbNSVjqm-zBW3",
			"https://drive.google.com/uc?export=download&id=1x3N_JlNIROo_2v7A4jYsIzIYd3Ez-0ep",
			"https://drive.google.com/uc?export=download&id=1yZMUmIIq8nvbannu3DUmLy7SOzgw0TMe",
			"https://drive.google.com/uc?export=download&id=1ymACbIzXyMNJIF8O_XImq9QA4fZcTNdR",
			"https://drive.google.com/uc?export=download&id=1zRAFPp3sMPOlVyhoEPnHflRpiRe6C2pt",

	];

	const availableVideos = link.filter(video => !sentVideos.includes(video));

	if (availableVideos.length === 0) {
		sentVideos = [];
	}

	const randomIndex = Math.floor(Math.random() * availableVideos.length);
	const randomVideo = availableVideos[randomIndex];

	sentVideos.push(randomVideo);

	return randomVideo;
}
