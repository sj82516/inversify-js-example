import {Container, interfaces} from "inversify";
import {LocalLogService, LogService, LogServiceTypes, LogServiceTypeValueTypes, SlackLogService} from "./logService";
import {PaymentGatewayService, PaypalPaymentGatewayService, StripePaymentGatewayService} from "./paymentGatewayService";
import {DynamicPaymentService, StaticPaymentService} from "./paymentService";

const paymentServiceContainer = new Container();
paymentServiceContainer.bind<LogService>(LogServiceTypes.local).to(LocalLogService);
paymentServiceContainer.bind<LogService>(LogServiceTypes.slack).to(SlackLogService);
paymentServiceContainer.bind<StaticPaymentService>("staticPaymentService").to(StaticPaymentService);
paymentServiceContainer.bind<StripePaymentGatewayService>("stripePaymentGateway").to(StripePaymentGatewayService);
paymentServiceContainer.bind<PaypalPaymentGatewayService>("paypalPaymentGateway").to(PaypalPaymentGatewayService);

paymentServiceContainer.bind<PaymentGatewayService>("PaymentGatewayService").to(StripePaymentGatewayService).whenTargetNamed("stripe")
paymentServiceContainer.bind<PaymentGatewayService>("PaymentGatewayService").to(PaypalPaymentGatewayService).whenTargetNamed("paypal")

type PaymentServiceFatory = (logType: LogServiceTypeValueTypes, paymentPlatform: string) => DynamicPaymentService;
paymentServiceContainer.bind<PaymentServiceFatory>("DynamicPaymentService").toFactory<DynamicPaymentService>((context: interfaces.Context) => {
    return (logType: string, paymentPlatform: string) => {
        let paymentGatewayService = context.container.getNamed<PaymentGatewayService>("PaymentGatewayService", paymentPlatform);
        let logService = context.container.get<LogService>(logType);
        return new DynamicPaymentService(logService, paymentGatewayService);
    };
});

export { paymentServiceContainer, PaymentServiceFatory}