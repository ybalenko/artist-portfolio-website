import assert from "node:assert/strict";
import test from "node:test";
import * as cdk from "aws-cdk-lib";
import { ContactFormStack } from "./cdk-app.mjs";

test("SES send permission is bound to the configured sender identity and From address", () => {
  const app = new cdk.App();
  const stack = new ContactFormStack(app, "ContactFormPermissionTest");
  const template = app.synth().getStackArtifact(stack.artifactId).template;
  const senderParameter = template.Parameters.SesSenderEmail;

  assert.equal(senderParameter.Type, "String");
  assert.equal(senderParameter.NoEcho, true);
  assert.equal(senderParameter.Default, undefined);
  assert.equal(
    new RegExp(senderParameter.AllowedPattern).test("artist@example.com"),
    true,
  );
  assert.equal(
    new RegExp(senderParameter.AllowedPattern).test("*@example.com"),
    false,
  );

  const statements = Object.values(template.Resources)
    .filter((resource) => resource.Type === "AWS::IAM::Policy")
    .flatMap((resource) => resource.Properties.PolicyDocument.Statement)
    .filter((statement) => [statement.Action].flat().includes("ses:SendEmail"));

  assert.equal(statements.length, 1);
  assert.equal(statements[0].Effect, "Allow");
  assert.deepEqual(statements[0].Condition, {
    StringEquals: { "ses:FromAddress": { Ref: "SesSenderEmail" } },
  });
  assert.deepEqual(statements[0].Resource, {
    "Fn::Join": [
      "",
      [
        "arn:",
        { Ref: "AWS::Partition" },
        ":ses:",
        { Ref: "AWS::Region" },
        ":",
        { Ref: "AWS::AccountId" },
        ":identity/",
        { Ref: "SesSenderEmail" },
      ],
    ],
  });
});

test("public contact route keeps configured abuse, privacy, and retention controls", () => {
  const app = new cdk.App();
  const stack = new ContactFormStack(app, "ContactFormBoundaryTest");
  const { Resources: resources } = app
    .synth()
    .getStackArtifact(stack.artifactId).template;
  const one = (type) => {
    const entries = Object.values(resources).filter(
      (resource) => resource.Type === type,
    );
    assert.equal(entries.length, 1, type);
    return entries[0].Properties;
  };

  const api = one("AWS::ApiGatewayV2::Api");
  assert.equal(api.ProtocolType, "HTTP");
  assert.deepEqual(api.CorsConfiguration.AllowOrigins, [
    "https://yuliabalenko.com",
    "https://www.yuliabalenko.com",
  ]);
  assert.deepEqual(api.CorsConfiguration.AllowMethods, ["OPTIONS", "POST"]);
  assert.equal(one("AWS::ApiGatewayV2::Route").RouteKey, "POST /contact");
  assert.deepEqual(one("AWS::ApiGatewayV2::Stage").DefaultRouteSettings, {
    ThrottlingBurstLimit: 5,
    ThrottlingRateLimit: 1,
  });

  const lambda = one("AWS::Lambda::Function");
  assert.equal(lambda.ReservedConcurrentExecutions, 2);
  assert.equal(lambda.Timeout, 10);
  assert.equal(lambda.Environment.Variables.MAX_MESSAGE_LENGTH, "5000");
  assert.equal(lambda.Environment.Variables.MAX_NAME_LENGTH, "100");
  assert.equal(lambda.Environment.Variables.MESSAGE_RATE_LIMIT_PER_HOUR, "5");
  assert.equal(
    lambda.Environment.Variables.ALLOWED_ORIGINS,
    "https://yuliabalenko.com,https://www.yuliabalenko.com",
  );

  assert.deepEqual(one("AWS::DynamoDB::Table").TimeToLiveSpecification, {
    AttributeName: "expiresAt",
    Enabled: true,
  });
  assert.equal(one("AWS::Logs::LogGroup").RetentionInDays, 7);

  const statements = one("AWS::IAM::Policy").PolicyDocument.Statement;
  const ssm = statements.find(
    (statement) => statement.Action === "ssm:GetParameter",
  );
  assert.ok(ssm);
  assert.equal(ssm.Resource.length, 3);
  assert.deepEqual(
    ssm.Resource.map((resource) => resource["Fn::Join"][1].at(-1)).sort(),
    [
      ":parameter/yulia-balenko/contact/abuse-salt",
      ":parameter/yulia-balenko/contact/recipient-email",
      ":parameter/yulia-balenko/contact/ses-sender-email",
    ],
  );
  assert.equal(JSON.stringify(ssm.Resource).includes('"*"'), false);
});
