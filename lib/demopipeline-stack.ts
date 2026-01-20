import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './pipelinesatge-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

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


    //create the test stage
    const teststage= pipeline.addStage(new PipelineAppStage(this,'test',{
      env:{account:'842676018297',region:'us-east-1'}
    }));
 
 
 
 
    //manual approval creation so that the user can check whether all the changes a re correct and then deploy all the changes to the production stage
    // If this step is added to a Pipeline, the Pipeline will be paused waiting for a human to resume it
    // Only engines that support pausing the deployment will support this step type.
    teststage.addPost(new ManualApprovalStep('approval'));
 
 
    //create the productionstage
    const prodstage= pipeline.addStage(new PipelineAppStage(this,'prod',{
      env:{account:'842676018297',region:'us-east-1'}
    }));
 

   
  }
}
