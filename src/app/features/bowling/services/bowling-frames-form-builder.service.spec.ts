import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { BowlingFramesFormBuilderService } from './bowling-frames-form-builder.service';
import { frameScoreValidator } from '../validators/frame-score-validator';

describe('BowlingFramesFormBuilderService', () => {
  let service: BowlingFramesFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BowlingFramesFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildFramesForm', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = service.buildFramesForm();
    });

    it('should create a form with three controls', () => {
      expect(form.contains('firstRoll')).toBe(true);
      expect(form.contains('secondRoll')).toBe(true);
      expect(form.contains('thirdRoll')).toBe(false);
    });

    it('should set default values and validators', () => {
      expect(form.controls['firstRoll'].value).toBe(0);
      expect(form.controls['secondRoll'].value).toBe(0);
      expect(form.controls['thirdRoll'].value).toBe(0);
      expect(form.controls['firstRoll'].validator).toBeTruthy();
      expect(form.controls['secondRoll'].validator).toBeTruthy();
      expect(form.controls['thirdRoll'].validator).toBeTruthy();
    });

    it('should disable the thirdRoll control by default', () => {
      expect(form.controls['thirdRoll'].disabled).toBe(true);
    });
  });

  describe('setOrRemoveFrameScoreValidators', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = service.buildFramesForm();
    });

    it('should enable thirdRoll and remove validators if removeScoreValidator is true', () => {
      service.setOrRemoveFrameScoreValidators(true, form);
      expect(form.controls['thirdRoll'].enabled).toBe(true);
      expect(form.validator).toBeNull();
    });

    it('should disable thirdRoll if removeScoreValidator is false', () => {
      service.setOrRemoveFrameScoreValidators(false, form);
      expect(form.controls['thirdRoll'].disabled).toBe(true);
    });
  });
});
