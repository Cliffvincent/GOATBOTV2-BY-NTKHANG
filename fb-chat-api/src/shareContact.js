/* eslint-disable linebreak-style */
"use strict";

var utils = require("../utils");

module.exports = function (defaultFuncs, api, ctx) {
	return function shareContact(text, senderID, threadID, callback) {
		var resolveFunc = function () { };
		var rejectFunc = function () { };

		var returnPromise = new Promise(function (resolve, reject) {
			resolveFunc = resolve;
			rejectFunc = reject;
		});

		if (!callback || utils.getType(callback) != "Function" && utils.getType(callback) != "AsyncFunction") {
			callback = function (err, data) {
				if (err) return rejectFunc(err);
				resolveFunc(data);
			};
		}
		global.mqttClient.publish('/ls_req', 
			JSON.stringify({
				app_id: "2220391788200892",
				payload: JSON.stringify({
					tasks: [{
							label: 359,
							payload: JSON.stringify({
								"contact_id": senderID,
								"sync_group": 1,
								"text": text || "",
								"thread_id": threadID
							}),
							queue_name: 'xma_open_contact_share',
							task_id: Math.random() * 1001 << 0,
							failure_count: null,
					}],
					epoch_id: utilID(),
					version_id: '7214102258676893',
				}),
				request_id: ++ctx.req_ID,
				type: 3
			}),
			{
				qos: 1,
				retain: false,
			}
		);
		ctx.callback_Task[ctx.req_ID] = new Object({
            callback,
            type: "shareContact"
        });
		return returnPromise;
	};
};