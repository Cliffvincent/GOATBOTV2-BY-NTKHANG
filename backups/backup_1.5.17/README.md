<img src="https://i.ibb.co/RQ28H2p/banner.png" alt="banner">
<h1 align="center"><img src="./dashboard/images/logo-non-bg.png" width="22px">Goatbot-V2 Bot chat messenger</h1>

	
- [📝 **Note**](#-note)
- [🚧 **Requirement**](#-requirement)
- [📝 **Tutorial**](#-tutorial)
- [🔔 **How to get notification when have new update?**](#-how-to-get-notification-when-have-new-update)
- [🆙 **How to Update**](#-how-to-update)
- [🛠️ **How to create new commands**](#️-how-to-create-new-commands)
- [💭 **Support**](#-support)
- [📚 **Support Languages in source code**](#-support-languages-in-source-code)
- [📌 **Common Problems**](#-common-problems)
- [❌ **DO NOT USE THE ORIGINAL UNDERGRADUATE VERSION**](#-do-not-use-the-original-undergraduate-version)
- [📸 **Screenshots**](#-screenshots)
- [✨ **Copyright (C)**](#-copyright-c)
- [📜 **License**](#-license)

<hr>

## 📝 **Note**
- This is a messenger chat bot using a personal account, using an [unofficial api](https://github.com/ntkhang03/fb-chat-api/blob/master/DOCS.md) ([Origin here](https://github.com/Schmavery/facebook-chat-api)) and this may lead to facebook account being locked due to spam or other reasons. 
- So, I recommend using a clone account (one that you're willing to throw away at any time)
- ***I am not responsible for any problems that may arise from using this bot.***

## 🚧 **Requirement**
- Node.js 16.x [Download](https://nodejs.org/dist/v16.20.0) | [Home](https://nodejs.org/en/download/) | [Other versions](https://nodejs.org/en/download/releases/)
- Knowledge of **programming**, javascript, nodejs, unofficial facebook api

## 📝 **Tutorial**
Tutorial has been uploaded on YouTube
- For mobile phone: https://www.youtube.com/watch?v=grVeZ76HlgA
- For vps/windows: https://www.youtube.com/watch?v=uCbSYNQNEwY
  
Summary instructions:
- See [here](https://github.com/ntkhang03/Goat-Bot-V2/blob/main/STEP_INSTALL.md)

## 🔔 **How to get notification when have new update?**
- Click on the `Watch` button in the upper right corner of the screen and select `Custom` and select `Pull requests` and `Releases` and click `Apply` to get notified when there is a new update.

## 🆙 **How to Update**
Tutorial has been uploaded on YouTube
- on phone/repl: https://youtu.be/grVeZ76HlgA?t=1342
- on vps/computer: https://youtu.be/uCbSYNQNEwY?t=508

## 🛠️ **How to create new commands**
- See [here](https://github.com/ntkhang03/Goat-Bot-V2/blob/main/DOCS.md)

## 💭 **Support**
If you have major coding issues with this bot, please join and ask for help.
- https://discord.com/invite/DbyGwmkpVY (recommended)
- https://www.facebook.com/groups/goatbot
- https://www.facebook.com/groups/goatbot/permalink/493150412403231
- https://m.me/j/AbYrIGusyc0M402z
- ~~https://t.me/gatbottt~~ (no longer supported)
- ***Please do not inbox me, I do not respond to private messages, any questions please join the chat group for answers. ThankThanks!***

## 📚 **Support Languages in source code**
- Currently, the bot supports 2 languages:
- [x] `en: English`
- [x] `vi: Vietnamese`

- Change language in `config.json` file
- You can customize the language in the folder `languages/`, `languages/cmds/` and `languages/events/`

## 📌 **Common Problems**
<details>
	<summary>
		📌 Error 400: redirect_uri_mismatch
	</summary>
	<p><img src="https://i.ibb.co/6Fbjd4r/image.png" width="250px"></p> 
	<p>1. Enable Google Drive API: <a href="https://youtu.be/nTIT8OQeRnY?t=347">Tutorial</a></p>
	<p>2. Add uri <a href="https://developers.google.com/oauthplayground">https://developers.google.com/oauthplayground</a> (not <a href="https://developers.google.com/oauthplayground/">https://developers.google.com/oauthplayground/</a>) to <b>Authorized redirect URIs</b> in <b>OAuth consent screen:</b> <a href="https://youtu.be/nTIT8OQeRnY?t=491">Tutorial</a></p>  
	<p>3. Choose <b>https://www.googleapis.com/auth/drive</b> and <b>https://mail.google.com/</b> in <b>OAuth 2.0 Playground</b>: <a href="https://youtu.be/nTIT8OQeRnY?t=600">Tutorial</a></p>
</details>

<details>
	<summary>
		📌 Error for site owners: Invalid domain for site key
	</summary>
		<p><img src="https://i.ibb.co/2gZttY7/image.png" width="250px"></p>
		<p>1. Go to <a href="https://www.google.com/recaptcha/admin">https://www.google.com/recaptcha/admin</a></p>
		<p>2. Add domain <b>repl.co</b> (not <b>repl.com</b>) to <b>Domains</b> in <b>reCAPTCHA v2</b> <a href="https://youtu.be/nTIT8OQeRnY?t=698">Tutorial</a></p>
</details>

<details>
	<summary>
		📌 GaxiosError: invalid_grant, unauthorized_client 
	</summary>
		<p><img src="https://i.ibb.co/n7w9TkH/image.png" width="250px"></p>
		<p><img src="https://i.ibb.co/XFKKY9c/image.png" width="250px"></p>
		<p><img src="https://i.ibb.co/f4mc5Dp/image.png" width="250px"></p>
		<p>- If you don't publish the project in google console, the refresh token will expire after 1 week and you need to get it back. <a href="https://youtu.be/nTIT8OQeRnY?t=445">Tuatorial</a></p>
</details>

<details>
	<summary>
		📌 GaxiosError: invalid_client
	</summary>
		<p><img src="https://i.ibb.co/st3W6v4/Pics-Art-01-01-09-10-49.jpg" width="250px"></p>
		<p>- Check if you have entered your google project client_id correctly <a href="https://youtu.be/nTIT8OQeRnY?t=509">Tuatorial</a></p>
</details>

<details>
	<summary>
		📌 Error 403: access_denied
	</summary>
		<p><img src="https://i.ibb.co/dtrw5x3/image.png" width="250px"></p>
		<p>- If you don't publish the project in google console only the approved accounts added to the project can use it <a href="https://youtu.be/nTIT8OQeRnY?t=438">Tuatorial</a></p>
</details>

## ❌ **DO NOT USE THE ORIGINAL UNDERGRADUATE VERSION**
- The use of unknown source code can lead to the device being infected with viruses, malware, hacked social accounts, banks, ...
- Goat-Bot-V2 is only published at https://github.com/ntkhang03/Goat-Bot-V2, all other sources, all forks from other github, replit,... are fake, violate policy
- If you use from other sources (whether accidentally or intentionally) it means that you are in violation and will be banned without notice
## 📸 **Screenshots**
- ### Bot
<details>
	<summary>
 		Rank system
	</summary>

  - Rank card:
  <p><img src="https://i.ibb.co/d0JDJxF/rank.png" width="399px"></p>

  - Rankup notification:
  <p><img src="https://i.ibb.co/WgZzthH/rankup.png" width="399px"></p>

  - Custom rank card:
  <p><img src="https://i.ibb.co/hLTThLW/customrankcard.png" width="399px"></p>
</details>

<details>
	<summary>
 		Weather
	</summary>
	<p><img src="https://i.ibb.co/2FwWVLv/weather.png" width="399px"></p>
</details>

<details>
	<summary>
 		Auto send notification when have user join or leave box chat (you can custom message)
	</summary>
	<p><img src="https://i.ibb.co/Jsb5Jxf/wcgb.png" width="399px"></p>
</details>

<details>
	<summary>
 		Openjourney
	</summary>
	<p><img src="https://i.ibb.co/XJfwj1X/Screenshot-2023-05-09-22-43-58-630-com-facebook-orca.jpg" width="399px"></p>
</details>

<details>
	<summary>
 		GPT
	</summary>
	<p><img src="https://i.ibb.co/D4wRbM3/Screenshot-2023-05-09-22-47-48-037-com-facebook-orca.jpg" width="399px"></p>
	<p><img src="https://i.ibb.co/z8HqPkH/Screenshot-2023-05-09-22-47-53-737-com-facebook-orca.jpg" width="399px"></p>
	<p><img src="https://i.ibb.co/19mZQpR/Screenshot-2023-05-09-22-48-02-516-com-facebook-orca.jpg" width="399px"></p>
</details>



- ### Dashboard
<details>
	<summary>
 		Home:
	</summary>
	<p><img src="https://i.ibb.co/xzv6s2j/dbHome.png" width="399px"></p>
</details>

<details>
	<summary>
 		Stats:
	</summary>
	<p><img src="https://i.ibb.co/zVZv9LF/dbStats.png" width="399px"></p>
</details>

<details>
	<summary>
 		Login/Register:
	</summary>
	<p><img src="https://i.ibb.co/SK61MRx/dbLogin.png" width="399px"></p>
	<p><img src="https://i.ibb.co/1rchbb1/db-Register.png" width="399px"></p>
</details>

<details>
	<summary>
 		Dashboard Thread:
	</summary>
	<p><img src="https://i.ibb.co/NK5yYwx/dbThread.png" width="399px"></p>
</details>

<details>
	<summary>
 		Custom on/off:
	</summary>
	<p><img src="https://i.ibb.co/mJqsP2L/dbCustom.png" width="399px"></p>
</details>

<details>
	<summary>
 		Custom welcome message (similar with leave, rankup (coming soon), custom command (coming soon))
	</summary>
	<p><img src="https://i.ibb.co/3SyfQkz/db-Custom-Welcome.png" width="399px"></p>
</details>

## ✨ **Copyright (C)**
- **[NTKhang (NTKhang03)](https://github.com/ntkhang03)**

## 📜 **License**

**VIETNAMESE**

- ***Nếu bạn vi phạm bất kỳ quy tắc nào, bạn sẽ bị cấm sử dụng dự án của tôi***
- Không bán mã nguồn của tôi
- Không tự xưng là chủ sở hữu của mã nguồn của tôi
- Không kiếm tiền từ mã nguồn của tôi (chẳng hạn như: mua bán lệnh, mua bán/cho thuê bot, kêu gọi quyên góp, v.v.)
- Không xóa/sửa đổi credit (tên tác giả) trong mã nguồn của tôi

**ENGLISH**

- ***If you violate any rules, you will be banned from using my project***
- Don't sell my source code
- Don't claim my source code as your own
- Do not monetize my source code (such as: buy and sell commands, buy and sell bots, call for donations, etc.)
- Don't remove/edit my credits (author name) in my source code

# **Global Ban Storage Directory**

GoatBot stores global bans in a dedicated directory called Data-Gban-GoatBot-Project at the root level of the project. This directory contains ban files for each user who has been globally banned.

The forbidden file is an object containing multiple entries, each of which represents a banned user. Each entry has a unique identifier as its key and contains the reason for the ban, the proof (e.g. a screenshot), and the date of the ban. The proof is stored as an array of URLs pointing to the location of the proof files.

* `id`: the ID of the banned user
* `reason`: the reason for the ban
* `proof`: an array of URLs to proof of the ban
* `date`: the timestamp of the ban in ISO 8601 format
* **Here's an example ban file for a user with ID 123456789:**

```json
{
	"123456789": {
		"reason": "Spamming the chat",
		"proof": [
			"https://example.com/proof1.jpg",
			"https://example.com/proof2.mp4"
		],
		"date": "2023-04-02T12:12:12+0000"
	}
}
```
---

Any questions or complaints please contact with the information below:
<table>
<tr>
<td align="center"><a href="https://t.me/ntkhang03"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"></a>
</td>
<td align="center"><a href="https://www.facebook.com/ntkhang03"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white"></a>
</td>
</tr>

<tr>
<td align="center"><a href="https://twitter.com/ntkhang03"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"></a>
</td>
<td align="center"><a href="https://www.youtube.com/@NTKhang03"><img src="https://img.shields.io/badge/Youtube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"></a>
</td>
</tr>

<tr>
<td align="center" colspan=2><a href="https://github.com/ntkhang03"><img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</td>
</tr>
</table>

<p align="center">
	<img alt="size" src="https://img.shields.io/github/repo-size/ntkhang03/Goat-Bot.svg?style=flat-square&label=size">
	<img alt="code-version" src="https://img.shields.io/badge/dynamic/json?color=red&label=code%20version&prefix=v&query=%24.version&url=https://github.com/ntkhang03/Goat-Bot/raw/main/package.json&style=flat-square">
	<img alt="visitors" src="https://visitor-badge.laobi.icu/badge?page_id=ntkhang3.Goat-Bot">
</p>

## **NOTE**: ***There is now version 2 with improved performance and stability: [here](https://github.com/ntkhang03/Goat-Bot-V2)***
<hr>

## HOW TO INSTALL
### Video
* Installation Instructions in hosting replit: [click here](https://youtu.be/PIjtrHXLakE)
* Installation Instructions in VPS: [click here](https://youtu.be/wo8Pz_5N-ug)
[![IMAGE_ALT](https://i.imgur.com/n4svD1I.png)](https://youtu.be/PIjtrHXLakE)

### Bên dưới là tóm tắt cách cái đặt và sử dụng bot:
* Bước 1: cài đặt nodejs
* Bước 2: clone project về máy
* Bước 3: tải và cài đặt [tiện ích này](https://github.com/ntkhang03/resources-goat-bot/blob/master/c3c-fbstate-extractor.crx?raw=true) (nếu sử dụng kiwi browser trên điện thoại) hoặc [tiện ích này](https://github.com/ntkhang03/resources-goat-bot/blob/master/c3c-fbstate-master.zip?raw=true) (nếu sử dụng trên Windows) vào trình duyệt
* Bước 4: mở trình duyệt, đăng nhập vào tài khoản facebook dùng để treo bot (acc phụ). Sau đó mở tiện ích vừa cài ở bước trên, nhấp vào nút Export FBstate. lúc này sẽ tải 1 file fbstate.json về máy, copy file đó vào project
* Bước 5: mở cmd di chuyển đến thư mục chứa project. Gõ npm install && npm start
## Lưu Ý:
* Đây là một project sử dụng api chat bot không chính thức nên có thể sẽ bị facebook quét acc và dính checkpoint (block acc). Vì vậy nên cân nhắc trước khi sử dụng hoặc sử dụng một tài khoản clone (tài khoản phụ) để treo.
* Nghiêm cấm mọi hình thức rao bán source code. Vì đây là một project hoàn toàn miễn phí

## HOW TO UPDATE WHEN HAVE NEW VERSION
* Type in cmd

> node update.js

or

> npm update

## DEMO
![image](https://i.ibb.co/NZpRk31/Screenshot-2021-12-12-16-01-59-14.png)
![image](https://i.ibb.co/d4ccbJd/Screenshot-2021-12-12-15-55-32-66.png)
![image](https://i.ibb.co/jZ7F74c/IMG-20211212-160006.jpg)
![image](https://i.ibb.co/bJ1Hckw/IMG-20220110-163630.jpg)

## FEEDBACK & REPORT BUGS
* https://github.com/ntkhang03/Goat-Bot/issues
* https://www.facebook.com/groups/399521505099456/?ref=share
## CONTACT
[NTKhang](https://facebook.com/100010382497517)

## DONATE ME
* MB Bank: 0789629831 (Nguyễn Thành Khang)
* Momo: 0789629831 (Nguyễn Thành Khang)

## THANKS FOR USING MY PROJECT
![failed image](https://www.english-learning.net/wp-content/uploads/2018/03/Thank-you.jpg)