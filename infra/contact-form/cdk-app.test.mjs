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
