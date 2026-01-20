import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class DemopipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, 'demopipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'sparshgupta121/Pipelinetest',
          'main',{
            connectionArn: 'arn:aws:codeconnections:us-east-1:842676018297:connection/0c7e636f-a37d-4230-9389-09a190c6ce6e'
          }  
        ),
       
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });
 

   
  }
}
