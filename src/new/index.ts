import "reflect-metadata";

import {Client, Order, DynamicPaymentService, StaticPaymentService} from "./paymentService";
import {paymentServiceContainer, PaymentServiceFatory} from "./inversify.config";
import {LogServiceTypes, LogServiceTypeValueTypes} from "./logService";


function main() {
   const client: Client = {
       name: "yuanchieh",
       balance: 100
   }
   const order: Order = {
       total: 94
   }

   const factory = paymentServiceContainer.get<PaymentServiceFatory>("DynamicPaymentService");
   const paymentService = factory(LogServiceTypes.slack, "paypal");
   paymentService.pay(client, order);

   const staticPaymentService = paymentServiceContainer.get<StaticPaymentService>("staticPaymentService");
   staticPaymentService.pay(client, order);
}

main();