import {Client, Order} from "./paymentService";

export interface PaymentGatewayService {
    totalFee(order: Order): number;
    generateLink(client: Client, cost: number): string;
}

export class StripePaymentGatewayService implements PaymentGatewayService{
   static fee = 0.05;
   totalFee(order: Order): number {
       return order.total * (1 + StripePaymentGatewayService.fee);
   }

   generateLink(client: Client, cost: number): string {
       return `?name=${client.name}&cost=${cost}`
   }
}

export class PaypalPaymentGatewayService implements PaymentGatewayService {
    static fee = 0.1;
    totalFee(order: Order): number {
        if (order.total < 100) {
            return order.total * (1 + StripePaymentGatewayService.fee);
        }
        return order.total
    }

    generateLink(client: Client, cost: number): string {
        return `?name=${client.name}&cost=${cost}`
    }
}