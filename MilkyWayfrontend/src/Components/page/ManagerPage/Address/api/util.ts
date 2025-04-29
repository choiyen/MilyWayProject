import { paths } from "@/config/paths/paths";
import { DELETE, GET, POST } from "@/config/request/axios/axiosInstance";
import { AddressType } from "@/types/Feature/Address/AddressType";

export const AddressInsertfetchData = async (Addressdata: AddressType) => {
  const response = await POST({
    url: paths.Address.basic.path,
    data: Addressdata,
  });
  return response;
};

export const AddressSelectfetchData = async () => {
  return await GET({
    url: paths.Address.search.path,
  });
};

export const AddressDeletefetchData = async (AddressId: string) => {
  return await DELETE({
    url: `${paths.Address.basic.path}?addressId=${AddressId}`, // 주소 ID를 쿼리 파라미터로 전달
  });
};
