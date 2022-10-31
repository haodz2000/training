import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Autocomplete,
  FormControl,
  Pagination,
  PaginationItem,
  TextField,
  Typography
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridValueGetterParams,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Search } from '@mui/icons-material';
import {
  ILocation,
  IProvince,
  IWard,
  IDistrict
} from '../../interfaces/interface';
import * as areaService from '../../services/areaService';
import * as siteService from '../../services/siteService';
interface IFormData {
  province: string;
  district: string;
  ward: string;
}

const Wrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  padding: 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid rgba(38, 56, 150, 0.14);
  box-shadow: 0px 4px 12px rgba(34, 41, 47, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.div``;
const SearchContainer = styled.div`
  margin: 10px 0px;
  width: 100%;
  overflow-x: hidden;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  max-height: 637px;
  margin: 5px 0;
`;
const BtnSearch = styled(LoadingButton)`
  background: #171a88;
  width: 148px;
  height: inherit;
  padding: 8px 16px;
  color: #ffffff;
  border-radius: 8px 8px 8px 0px;
  &:hover {
    background: #171a88;
    color: #ffffff;
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #eeeeee;
`;

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'STT',
    width: 50,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Tên điểm tiêm',
    minWidth: 185,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'address',
    headerName: 'Số nhà, tên đường',
    minWidth: 185,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'ward',
    headerName: 'Xã/Phường',
    type: 'string',
    minWidth: 185,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.ward.name
  },
  {
    field: 'district',
    headerName: 'Quận/Huyện',
    minWidth: 185,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      params.row.ward.district.name
  },
  {
    field: 'province',
    headerName: 'Tỉnh/Thành phố',
    type: 'string',
    editable: true,
    minWidth: 185,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      params.row.ward.district.province.name
  },
  {
    field: 'leader',
    headerName: 'Người đứng đầu cơ sở tiêm chủng',
    type: 'string',
    minWidth: 185,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'table',
    headerName: 'Số bàn tiêm',
    type: 'number',
    headerAlign: 'center',
    align: 'center'
  }
];
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}
const Location = () => {
  const [totalSites, setTotalSites] = useState<ILocation[]>([]);
  const [sites, setSites] = useState<ILocation[]>([]);
  const [provinceSelect, setProvinceSelect] = useState<IProvince>();
  const [districtSelect, setDistrictSelect] = useState<IDistrict>();
  const [wardSelect, setWardSelect] = useState<IWard>();
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const { watch, setValue, register, handleSubmit } = useForm<IFormData>({
    mode: 'onChange',
    defaultValues: {
      province: '',
      district: '',
      ward: ''
    }
  });
  const province = watch('province');
  const district = watch('district');
  const ward = watch('ward');

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const sites = await siteService.findAll();
        setTotalSites(sites);
        setSites(sites);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProvinces = async () => {
      try {
        const provinces = await areaService.findAllProvinces();
        setProvinces(provinces);
      } catch (error) {
        throw new Error();
      }
    };
    fetchSites();
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (!!provinceSelect) {
      setValue('district', '');
      setValue('ward', '');
      setValue('province', provinceSelect.name);
      setDistricts([]);
      setWards([]);
      const fetchDistricts = async () => {
        try {
          const districts = await areaService.findDistricts(provinceSelect.id);
          setDistricts(districts);
        } catch (error) {
          throw new Error();
        }
      };
      fetchDistricts();
    }
  }, [provinceSelect, setValue]);
  useEffect(() => {
    if (!!districtSelect) {
      setValue('district', districtSelect.name);
      setValue('ward', '');
      setWards([]);
      const fetchWards = async () => {
        try {
          const wards = await areaService.findWards(districtSelect.id);
          setWards(wards);
        } catch (error) {
          throw new Error();
        }
      };
      fetchWards();
    }
  }, [districtSelect, setValue]);
  useEffect(() => {
    if (!!wardSelect) {
      setValue('ward', wardSelect.name);
    }
  }, [wardSelect, setValue]);
  useEffect(() => {
    if (province === '') {
      setValue('district', '');
      setValue('ward', '');
    }
  }, [province, setValue]);
  useEffect(() => {
    if (district === '') {
      setValue('ward', '');
    }
  }, [district, setValue]);
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    if (data.province !== '') {
      const sitesSearch = sites
        .filter((item) => {
          if (item) {
            if (data.province) {
              return item.ward?.district?.province?.name === data.province;
            }
          }
          return true;
        })
        .filter((item) => {
          if (data.district) {
            return item.ward?.district?.name === data.district;
          }
          return true;
        })
        .filter((item) => {
          if (data.ward) {
            return item.ward?.name === data.ward;
          }
          return true;
        });
      setSites(sitesSearch);
    } else {
      setSites(totalSites);
    }
  };
  return (
    <Wrapper>
      <Title>
        <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
          Tra cứu điểm tiêm theo địa bàn
        </Typography>
      </Title>
      <SearchContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Autocomplete
            disablePortal
            options={provinces}
            inputValue={province}
            sx={{ width: 250, marginRight: '10px' }}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setProvinceSelect(value as IProvince)}
            isOptionEqualToValue={() => true}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('province')}
                size="small"
                label="Tỉnh/Thành phố"
              />
            )}
          />
          <Autocomplete
            readOnly={province === ''}
            disablePortal
            options={districts}
            inputValue={district}
            sx={{ width: 250, marginRight: '10px' }}
            onChange={(event, value) => setDistrictSelect(value as IDistrict)}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={() => true}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('district')}
                size="small"
                label="Quận/Huyện"
              />
            )}
          />
          <Autocomplete
            disablePortal
            readOnly={district === ''}
            options={wards}
            inputValue={ward}
            sx={{ width: 250, marginRight: '10px' }}
            onChange={(event, value) => setWardSelect(value as IWard)}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={() => true}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('ward')}
                size="small"
                label="Xã/Phường"
              />
            )}
          />
          <FormControl sx={{ marginRight: '10px', width: '20%' }}>
            <BtnSearch type="submit" startIcon={<Search />}>
              <Typography>Tìm kiếm</Typography>
            </BtnSearch>
          </FormControl>
        </Form>
      </SearchContainer>
      <Divider />
      <Container>
        <DataGrid
          autoHeight
          rows={sites}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          pagination
          components={{ Pagination: CustomPagination }}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Container>
    </Wrapper>
  );
};

export default Location;
