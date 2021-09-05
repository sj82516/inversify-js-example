import {Client, Order, PaymentService} from "./paymentService";
import {PaypalPaymentGatewayService, StripePaymentGatewayService} from "./paymentGatewayService";
import {LocalLogService, SlackLogService} from "./logService";

function main() {
   const client: Client = {
       name: "yuanchieh",
       balance: 100
   }
   const order: Order = {
       total: 94
   }

   const paymentGatewayService = new PaypalPaymentGatewayService();
   let logService = new SlackLogService();
   if (process.env.NODE_ENV === 'dev') {
       logService = new LocalLogService();
   }
   const paymentService = new PaymentService(logService, paymentGatewayService);
   paymentService.pay(client, order);
}

main();