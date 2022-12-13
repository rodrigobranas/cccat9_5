export default abstract class CLIHandler {
	commands: { [command: string]: Function } = {};

	on (command: string, callback: Function) {
		this.commands[command] = callback;
	}

	async type (text: string): Promise<void> {
		const [command] = text.split(" ");
		if (!this.commands[command]) return;
		const params = text.replace(command, "").trim();
		await this.commands[command](params);
	}

	abstract write (text: string): void;
}