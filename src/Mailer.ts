export default interface MailerConsole {
	send (to: string, subject: string, message: string): Promise<any>;
}
