import {LocalLogService, LogService, LogServiceTypes} from "./logService";
import {PaymentGatewayService} from "./paymentGatewayService";
import {inject, injectable, interfaces} from "inversify";
import {paymentServiceContainer} from "./inversify.config";

export type Client = {
    name: string;
    balance: number;
}

export type Order = {
    total: number;
}

export class DynamicPaymentService {
    constructor(
        private logService: LogService,
        private paymentGatewayService: PaymentGatewayService
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

@injectable()
export class StaticPaymentService {
    constructor(
        @inject(LogServiceTypes.slack) private logService: LogService,
        @inject("stripePaymentGateway") private paymentGatewayService: PaymentGatewayService
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