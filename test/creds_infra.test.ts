import { expect as expectCDK, countResources } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import * as CredsInfra from '../lib/creds_infra-stack'

test('Stack', () => {
  const app = new cdk.App()
  const stack = new CredsInfra.CredsInfraStack(app, 'MyTestStack')
  expectCDK(stack).to(countResources('AWS::IAM::Role', 1))
  expectCDK(stack).to(countResources('AWS::IAM::User', 1))
})
