import { Controller, Inject } from '@nestjs/common';
import { AdministrativeUnitService } from './administrativeunit.service';

@Controller()
export class AdministrativeUnitController {
  constructor(
    @Inject('IMPORT_UNIT_ADMINISTRATIVE_SERVER')
    private readonly administrativeUnitService: AdministrativeUnitService,
  ) {}
}
