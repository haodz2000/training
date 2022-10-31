import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Link,
  Pagination,
  PaginationItem,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import { Close, Download, Edit, Search } from '@mui/icons-material';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IDocument } from '../../interfaces/interface';
import { TransitionProps } from '@mui/material/transitions';
import { NewDocument } from '../../components/Create';
import { useAppSelector } from '../../app';
import { selectDocument } from '../../features/document/documentSlice';
import { axioInstance } from '../../utils/request/httpRequest';
import { selectIsAdmin } from '../../features/auth/authSlice';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wrapper = styled.div`
  margin-top: 42px;
  width: 100vw;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
`;
const Container = styled.div`
  border: 1px solid rgba(38, 56, 150, 0.14);
  max-width: 1440px;
  width: 100%;
  padding: 12px 12px 0;
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 50px;
`;
const ComponentInput = styled.div`
  box-sizing: border-box;
  margin-right: 16px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
`;
const ButtonSearch = styled(Button)`
  padding: 8px 16px;
  background: #171a88;
  border-radius: 8px 8px 8px 0px;
  color: #ffffff;
`;
const FormDialog = styled.div`
  width: 444px;
`;
const HeaderForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Label = styled.label`
  cursor: pointer;
  &:hover {
    padding: 0 2px;
    background: #d3d3d3;
    border-radius: 50%;
  }
`;
const BodyForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  box-sizing: border-box;
`;
const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;
const FooterForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Cancel = styled(Button)`
  padding: 6px 16px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  color: #3f51b5;
  margin-right: 16px;
  border-radius: 8px 8px 8px 0;
`;
const Save = styled(Button)`
  padding: 6px 16px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 8px 8px 8px 0;
  color: #ffffff;
`;
const Hidden = styled.div`
  display: none;
`;
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'STT',
    width: 100,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Tên tài liệu',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'link',
    headerName: 'Download',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => {
      return (
        <Label>
          <Link target={'_blank'} href={params.row.link}>
            <Download />
          </Link>
        </Label>
      );
    }
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
interface IFormEdit {
  id: number;
  name: string;
  description: string;
  link: string;
}
const schema = yup
  .object({
    name: yup.string().required('Tên tài liệu không được để trống').trim(),
    link: yup.string().required('Link tài liệu không được để trống').trim()
  })
  .required();
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Document = () => {
  const axiosToken = useAxiosPrivate();
  const isAdmin = useAppSelector(selectIsAdmin);
  const newDocument = useAppSelector(selectDocument);
  const [edit, setEdit] = useState<boolean>(false);
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [totalDocs, setTotalDocs] = useState<IDocument[]>([]);
  const [nameDocument, setNameDocument] = useState<string>('');
  const [rowSelected, setRowSelected] = useState<IDocument>();
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors }
  } = useForm<IFormEdit>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axioInstance.get('documents');
        setDocuments(res.data);
        setTotalDocs(res.data);
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (newDocument.id !== 0) {
      setDocuments((prev) => [newDocument as IDocument, ...prev]);
    }
  }, [newDocument]);
  useEffect(() => {
    setValue('id', rowSelected?.id as number);
    setValue('name', rowSelected?.name as string);
    setValue('description', rowSelected?.description as string);
    setValue('link', rowSelected?.link as string);
  }, [rowSelected, setValue]);
  useEffect(() => {
    if (nameDocument === '') {
      setDocuments(totalDocs);
    }
  }, [nameDocument, totalDocs]);

  const handleClickOpen = (param: IDocument) => {
    setRowSelected(param);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitSearch = () => {
    const res = totalDocs.filter((item) => {
      return item.name
        .toLocaleLowerCase()
        .includes(nameDocument.toLocaleLowerCase());
    });
    setDocuments(res);
  };
  const onUpdateDocument: SubmitHandler<Partial<IDocument>> = async (data) => {
    try {
      const { id, ...rest } = data;
      const updated = await axiosToken.patch<IDocument>(
        `documents/${id}`,
        rest
      );
      if (updated) {
        const result = totalDocs.map((item) => {
          if (item.id === updated.data.id) {
            item = {
              ...item,
              ...updated.data
            };
          }
          return item;
        });
        setDocuments(result);
        setTotalDocs(result);
        setOpen(false);
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };
  return (
    <Wrapper>
      {isAdmin && <NewDocument />}
      <Container>
        <Row>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => setNameDocument(e.target.value as string)}
                size="small"
                placeholder="Tên tài liệu"
              />
            </FormControl>
          </ComponentInput>
          <ComponentInput>
            <ButtonSearch onClick={onSubmitSearch} startIcon={<Search />}>
              <Typography fontWeight={500}>Tìm kiếm</Typography>
            </ButtonSearch>
          </ComponentInput>
        </Row>
        <Divider />
        <Row>
          <DataGrid
            disableColumnMenu
            onRowClick={(param) =>
              isAdmin && handleClickOpen(param.row as IDocument)
            }
            autoPageSize
            autoHeight
            rows={documents}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            pagination
            components={{ Pagination: CustomPagination }}
          />
        </Row>
        <Row>
          <FormDialog>
            <Dialog
              fullWidth
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description">
              <Form onSubmit={handleSubmit(onUpdateDocument)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập nhật tài liệu
                      </Typography>
                      <Label onClick={() => setEdit(!edit)}>
                        <Edit />
                      </Label>
                    </Title>
                    <Label onClick={handleClose}>
                      <Close />
                    </Label>
                  </HeaderForm>
                  <Divider />
                  <BodyForm>
                    <Hidden>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('id')}
                          size="small"
                        />
                      </FormControl>
                    </Hidden>
                    <Input>
                      <Typography>Tên tài liệu</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('name')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Mô tả chi tiết</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('description')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>URL</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.link}
                          helperText={errors.link?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('link')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                  </BodyForm>
                  {edit && (
                    <FooterForm>
                      <Cancel onClick={handleClose}>
                        <Typography fontWeight={500}>Hủy bỏ</Typography>
                      </Cancel>
                      <Save disabled={!isValid} type="submit">
                        <Typography fontWeight={500}>Xác nhận</Typography>
                      </Save>
                    </FooterForm>
                  )}
                </DialogContent>
              </Form>
            </Dialog>
          </FormDialog>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Document;
