import {LogService} from "./logService";
import {PaymentGatewayService} from "./paymentGatewayService";

export type Client = {
    name: string;
    balance: number;
}

export type Order = {
    total: number;
}

export class PaymentService {
    constructor(
        private logService: LogService,
        private paymentGatewayService: PaymentGatewayService,
    ) {

    }

    pay(client: Client, order: Order): string|void {
       const totalFee = this.paymentGatewayService.totalFee(order)
        if (totalFee > client.balance) {
            return this.logService.error(`${client.name} doesn't have enough money`);
        }

        this.logService.log(`${client.name} paid ${totalFee}`)

        return this.paymentGatewayService.generateLink(client, totalFee);
    }
}