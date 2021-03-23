#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { CredsInfraStack } from '../lib/creds_infra-stack'

const app = new cdk.App()
const env = { region: 'us-east-1' }
new CredsInfraStack(app, 'CredsInfraStack', { env }) // eslint-disable-line no-new
