import { HttpException } from '@nestjs/common/exceptions';
import { hospitalList } from './hospital-dummy-data';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';

describe('HospitalController', () => {
  let controller: HospitalController;
  let hospitalService: HospitalService;

  beforeEach(async () => {
    hospitalService = {} as HospitalService;
    controller = new HospitalController(hospitalService);
  });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    describe('Get list of hospitals', () => {
      it('should get the list of hospitals', async () => {
        hospitalService.findAllHospitals = jest.fn().mockResolvedValue(hospitalList);
          const result = await controller.findAllHospitals();
          expect(result).toBe(hospitalList);
      });

      it('should throw error when API response fails', async () => {
        hospitalService.findAllHospitals = jest.fn().mockRejectedValue(hospitalList);
          await expect(controller.findAllHospitals()).rejects.toThrow(HttpException);
      });
  });
  });