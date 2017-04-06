/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingApplicationsService } from './setting-applications.service';

describe('SettingApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingApplicationsService]
    });
  });

  it('should ...', inject([SettingApplicationsService], (service: SettingApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});
