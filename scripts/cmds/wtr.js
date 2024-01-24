const fs = require("fs")
const axios = require("axios")
const FormData = require('form-data');


module.exports = {
	config: {
		name: "wtr",
		version: "1.1",
		author: "NIB",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "Premium",
		guide: "",

	},

onStart: async function ({ event, message, getLang, threadsData, api, args}) {


if (event.type == "message_reply") {
			if (event.messageReply.attachments.length > 0 && (event.messageReply.attachments[0].type == "photo")) {
				try{

const file = await global.utils.getStreamFromURL(event.messageReply.attachments[0].url)

const form = new FormData();
form.append('file_type', 'image');
form.append('file', file);
	form.append("filenameOverride", "true")
						form.append("path","__editor/2022-12-05")

const res = await axios.post(
		'https://api.pixelbin.io/service/panel/assets/v1.0/upload/direct',
		form,
		{
				headers: {
						...form.getHeaders(),

						'authority': 'api.pixelbin.io',
						'accept': '*/*',
						'accept-language': 'en-US,en;q=0.9',
					 // 'captcha-code': '03AEkXODAqPGgEak00BISO8n08zhOJ2HlQ3DvtYzLQ83lwZUQ1dHmYfV49V-ms_S3Cu9N_C2YARgLs6KVLOWDZ8mzOZn3ng_5KND0NB0iS0L9P1Ccb_8vKkqYvBxdZ2w6O8s1gNGgLCRi9Cs5BQKV6U9Ma4rboJ8L7Py3IzYN33jqaqs4ytFx_am05X7JF-m63v6Q2k6_3Q94CnJZwSCFo5iFOJ8X2_qnY7Z7MKSAc5jGf1R8qA81lPdyNu4AAo94L6JxSmKRfr3G2zEWCyTFAIF4oCLsoDbr4nh4RTyjmf6HnCvdWgYvHhSpE4KYQMbU9aKa3csbgcHDAH1LBsgxAXYj-6HtWHF4eAt1TH1QF4S3RdQ3N8rbrypGeHVr3BI6qhrk0Aol-uEDVU9wCvCssk0AgzjeSPWNhy2kOghkPwjRf6FFm46RljrmuWpwSCuzVBJt6s6imyhDUruDhPmd_msimJhPw7FiL9xhxz0kv-XZQHt16viSi1F5PvuYkeKvqRKJ0ngIc7lSbHy3EjX-cGNJtR7ZmDSSSETGis60SY3vlV34fqLQyvWREmLq_Hr7F-acFKXHZGTourrxVS8j-XAvMvO7ZsxE1qBTMxgnkXh8kWyAYfc-gF0M7aqIUBNEmnpaDwTa7M4sDq6RuUfzrj-nniB8ENj-8Kb_OS-T2bCULAOTALnLYbd2MnF1ceLirxoWxZId0Uj-F1A95rCHhO_y7NXvInDffBNW4gHmg60xY8l3jOLLhRReHdDg_a2_-d6gxiZSt7KDEMv5l1SHXXmJznuAsqtIVrk1Yre5b-8ZEzTG4P3WcuIVbX2rHq9KRpA3v4E1bTtdVdwHayQGmBBYNaFd2OM31RoHVlYvj39ke0ZC8LzAOKE3my0DcN_oUeVpZ2ZAk99ADNu3YQiYnK3752zmTIshKKtYJ7DdL2iGCimC4wHI-qaOjB0HYM1SAziEOHiKw9wI0zdBqGR4fnWQkSWpBFdu_yX3a8pKSYc-otXpXSevlgEH58ubqYFOqXlhYHUiZ4rEyXvocuu49xE9uOpjQ3607wKOCPQ1FIUQTzCi2Z5N11EZjrkR3wXnBjRu2atqpgX1G1ke53V9bMD8sOuoCAthV_8EIGpUOwUJm8-8E28YS8ak8ZfHNE9gcxNkp42rH20k7i9b6UlnEv9717EwQrWFt7N4e_iSY9BdC1USu7yu9XSATfCHWLQcfAhhhGCwJyf5YWCduPKyzFUJcv65xgVpGwk4m45fKg3_7eZXE774312LCsfNsQKwm76pzUgiN7Uf3CVesTnnTwIIpdipdLk_Cvw',
						'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryQV329VionBgOIGSq',
						'origin': 'https://www.watermarkremover.io',
						'referer': 'https://www.watermarkremover.io/',
						'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
						'sec-ch-ua-mobile': '?1',
						'sec-ch-ua-platform': '"Android"',
						'sec-fetch-dest': 'empty',
						'sec-fetch-mode': 'cors',
						'sec-fetch-site': 'cross-site',
						'user-agent': 'Mozilla/5.0 (Linux; Android 12; RMX3085) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
						'x-ebg-param': 'MjAyMjEyMDVUMTMzNDEyWg==',
						'x-ebg-signature': 'v1:dc6505a4681854481fe68ffbea036fb8d25575bad481f9fc5e61920e13995c00'

				}
		}
)

let str = res.data

message.reply(JSON.stringify(str))
					//message.reply(ddd.replaceAll("amp;", ""))
				//message.reply({attachment:await global.utils.getStreamFromURL(ddd.replaceAll("amp;", ""))})

				}catch (e) {
					console.log(e)
					message.reply('🥺 server busy')
				}
			} else {
				message.reply("Only reply to images to make cartoons")
			}
		} else {
			message.reply("Only reply to images to make cartoons")
		}

}
}