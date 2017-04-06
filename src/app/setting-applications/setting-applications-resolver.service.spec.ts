/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingApplicationsResolverService } from './setting-applications-resolver.service';

describe('SettingApplicationsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingApplicationsResolverService]
    });
  });

  it('should ...', inject([SettingApplicationsResolverService], (service: SettingApplicationsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
