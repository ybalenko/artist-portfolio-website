import * as cdk from "aws-cdk-lib";
import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as logs from "aws-cdk-lib/aws-logs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defaultAllowedOrigins = [
  "https://yuliabalenko.com",
  "https://www.yuliabalenko.com",
];

const defaultParameterPrefix = "/yulia-balenko/contact";

const parseAllowedOrigins = (value) => {
  if (!value) {
    return defaultAllowedOrigins;
  }

  return String(value)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const parameterArn = (stack, parameterName) =>
  stack.formatArn({
    service: "ssm",
    resource: "parameter",
    resourceName: parameterName.replace(/^\//, ""),
  });

class ContactFormStack extends Stack {
  constructor(scope, id, props = {}) {
    super(scope, id, props);

    const allowedOrigins = parseAllowedOrigins(
      this.node.tryGetContext("allowedOrigins"),
    );

    const recipientEmailParameterName =
      this.node.tryGetContext("recipientEmailParameterName") ??
      `${defaultParameterPrefix}/recipient-email`;
    const sesSenderEmailParameterName =
      this.node.tryGetContext("sesSenderEmailParameterName") ??
      `${defaultParameterPrefix}/ses-sender-email`;
    const abuseSaltParameterName =
      this.node.tryGetContext("abuseSaltParameterName") ??
      `${defaultParameterPrefix}/abuse-salt`;

    const throttleTable = new dynamodb.Table(this, "ContactThrottleTable", {
      partitionKey: {
        name: "throttleKey",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: "expiresAt",
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const contactHandlerLogGroup = new logs.LogGroup(
      this,
      "ContactMessageHandlerLogGroup",
      {
        logGroupName: "/aws/lambda/yulia-balenko-contact-message",
        removalPolicy: RemovalPolicy.DESTROY,
        retention: logs.RetentionDays.ONE_WEEK,
      },
    );

    const contactHandler = new nodejs.NodejsFunction(
      this,
      "ContactMessageHandler",
      {
        entry: path.join(__dirname, "lambda", "contact-message.ts"),
        functionName: "yulia-balenko-contact-message",
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_22_X,
        architecture: lambda.Architecture.ARM_64,
        memorySize: 256,
        timeout: Duration.seconds(10),
        logGroup: contactHandlerLogGroup,
        bundling: {
          format: nodejs.OutputFormat.ESM,
          target: "node22",
          minify: true,
          sourceMap: false,
          mainFields: ["module", "main"],
        },
        environment: {
          ABUSE_SALT_PARAMETER_NAME: abuseSaltParameterName,
          ALLOWED_ORIGINS: allowedOrigins.join(","),
          MAX_MESSAGE_LENGTH: "5000",
          MAX_NAME_LENGTH: "100",
          MESSAGE_RATE_LIMIT_PER_HOUR: "5",
          RECIPIENT_EMAIL_PARAMETER_NAME: recipientEmailParameterName,
          SES_SENDER_EMAIL_PARAMETER_NAME: sesSenderEmailParameterName,
          THROTTLE_TABLE_NAME: throttleTable.tableName,
        },
      },
    );

    throttleTable.grantReadWriteData(contactHandler);

    contactHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ssm:GetParameter"],
        resources: [
          parameterArn(this, recipientEmailParameterName),
          parameterArn(this, sesSenderEmailParameterName),
          parameterArn(this, abuseSaltParameterName),
        ],
      }),
    );

    contactHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail"],
        resources: ["*"],
      }),
    );

    const contactApi = new apigatewayv2.HttpApi(this, "ContactMessageApi", {
      corsPreflight: {
        allowHeaders: ["content-type"],
        allowMethods: [
          apigatewayv2.CorsHttpMethod.OPTIONS,
          apigatewayv2.CorsHttpMethod.POST,
        ],
        allowOrigins: allowedOrigins,
        maxAge: Duration.days(1),
      },
    });

    contactApi.addRoutes({
      path: "/contact",
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        "ContactMessageIntegration",
        contactHandler,
      ),
    });

    new cdk.CfnOutput(this, "ContactApiUrl", {
      description: "Set this value as PUBLIC_CONTACT_API_URL in Amplify.",
      value: `${contactApi.apiEndpoint}/contact`,
    });
  }
}

const app = new cdk.App();

new ContactFormStack(app, "YuliaBalenkoContactFormStack", {
  description:
    "Contact form API for yuliabalenko.com: API Gateway, Lambda, SES, and short-lived abuse throttling.",
});
