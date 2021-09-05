import {Client, Order} from "./paymentService";
import {injectable} from "inversify";

export interface PaymentGatewayService {
    totalFee(order: Order): number;
    generateLink(client: Client, cost: number): string;
}

@injectable()
export class StripePaymentGatewayService implements PaymentGatewayService{
   static fee = 0.05;
   totalFee(order: Order): number {
       return order.total * (1 + StripePaymentGatewayService.fee);
   }

   generateLink(client: Client, cost: number): string {
       return `?name=${client.name}&cost=${cost}`
   }
}


@injectable()
export class PaypalPaymentGatewayService implements PaymentGatewayService {
    static fee = 0.1;
    totalFee(order: Order): number {
        if (order.total < 100) {
            return order.total * (1 + PaypalPaymentGatewayService.fee);
        }
        return order.total
    }

    generateLink(client: Client, cost: number): string {
        return `?name=${client.name}&cost=${cost}`
    }
}