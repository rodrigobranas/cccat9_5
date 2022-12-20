export default interface FreightGateway {
	calculateFreight (items: { volume: number, density: number, quantity: number }[], from?: string, to?: string): Promise<any>;
}
