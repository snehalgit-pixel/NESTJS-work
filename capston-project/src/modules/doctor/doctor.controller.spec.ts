import { Test, TestingModule } from '@nestjs/testing';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

describe("NoteController Unit Tests", () => {
  let doctorController: DoctorController;
  let spyService: DoctorService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: DoctorService,
      useFactory: () => ({
        addDoctor: jest.fn(() => []),
        findAllDoctors: jest.fn(() => []),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        findOneDoctorById: jest.fn(() => { }),
        
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [DoctorService, ApiServiceProvider],
    }).compile();

    doctorController = app.get<DoctorController>(DoctorController);
    spyService = app.get<DoctorService>(DoctorService);
  })

  it("calling addDoctor method", () => {
    const dto = new CreateDoctorDto();
    expect(doctorController.addDoctor(dto)).not.toEqual(null);
  })

  it("calling addDoctor method", () => {
    const dto = new CreateDoctorDto();
    doctorController.addDoctor(dto);
    expect(spyService.addDoctor).toHaveBeenCalled();
    expect(spyService.addDoctor).toHaveBeenCalledWith(dto);
  })

  it("calling findAllDoctors method", () => {
    doctorController.findAllDoctors();
    expect(spyService.findAllDoctors).toHaveBeenCalled();
  })

  it("calling findOneDoctorById method", () => {
    const dto = new CreateDoctorDto();
    dto.doctorId = 35;
    doctorController.findOneDoctorById(dto.doctorId);
    expect(spyService.findOneDoctorById).toHaveBeenCalled();
  })

});