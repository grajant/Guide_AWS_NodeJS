import { TestBed } from '@angular/core/testing';

import { AwsLambdaService } from './aws-lambda.service';

describe('AwsLambdaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsLambdaService = TestBed.get(AwsLambdaService);
    expect(service).toBeTruthy();
  });
});
