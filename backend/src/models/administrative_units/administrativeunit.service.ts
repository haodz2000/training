import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/district.entity';
import { Province } from 'src/typeorm/entities/province.entity';
import { Ward } from 'src/typeorm/entities/ward.entity';
import { Repository } from 'typeorm';
import { Command, ConsoleIO } from '@squareboat/nest-console';
import * as XLSX from 'xlsx';

@Injectable()
export class AdministrativeUnitService {
  constructor(
    @InjectRepository(Ward)
    private readonly wardRepository: Repository<Ward>,
    @InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  @Command('import', { desc: 'Test Command' })
  //Run: npm run build, node cli import
  async importData(_cli: ConsoleIO) {
    const provinces = [];
    const districts = [];
    const wards = [];
    _cli.info('Import File Data Execel to Database');
    const data = XLSX.readFile('src/utils/Data.xls').Sheets;
    const dataAdministrativeUnits = XLSX.utils.sheet_to_json(data['Sheet1']);
    dataAdministrativeUnits.forEach((item) => {
      const isExitProvince: boolean = provinces.some(
        (i) => i.name === item['Tỉnh Thành Phố'],
      );
      if (!isExitProvince) {
        provinces.push({ name: item['Tỉnh Thành Phố'] });
      }
    });
    await this.provinceRepository.insert(provinces);
    const provincesDB = await this.provinceRepository.find();
    provincesDB.forEach((provinceDb) => {
      const listDistricts = dataAdministrativeUnits.filter((province) => {
        return provinceDb.name === province['Tỉnh Thành Phố'];
      });
      listDistricts.forEach((item) => {
        const isExitDistrict: boolean = districts.some(
          (i) => i.name === item['Quận Huyện'],
        );
        if (!isExitDistrict) {
          districts.push({
            name: item['Quận Huyện'],
            provinceId: provinceDb.id,
          });
        }
      });
    });
    await this.districtRepository.insert(districts);
    const districtsDb = await this.districtRepository.find();
    dataAdministrativeUnits.forEach((item) => {
      const district = districtsDb.find((dis) => {
        return dis.name === item['Quận Huyện'];
      });
      if (!!district) {
        wards.push({
          name: item['Phường Xã'] || 'No name',
          districtId: district.id,
        });
      }
    });
    await this.wardRepository.insert(wards);
    _cli.info('Import data success');
  }
}
