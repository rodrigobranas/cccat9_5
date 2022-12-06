export default class MailerConsole {

	async send (to: string, subject: string, message: string) {
		console.log(to, subject, message);
	}
}
