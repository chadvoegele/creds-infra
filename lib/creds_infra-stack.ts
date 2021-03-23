import * as cdk from '@aws-cdk/core'
import * as iam from '@aws-cdk/aws-iam'

export class CredsInfraStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const admin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal(),
      roleName: 'admin',
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')]
    })

    const userName = process.env.USER
    if (userName === undefined) {
      throw new Error('Could not get USER from evironment!')
    }

    const user = new iam.User(this, 'User', {
      userName: userName,
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess')]
    })
    user.addToPolicy(new iam.PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: [admin.roleArn]
    }))
    new cdk.CfnOutput(this, 'UserArn', { value: user.userArn, exportName: 'UserArn' })
  }
}
