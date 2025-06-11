import { paths } from "@/config/paths/paths";
import { DELETE, GET, POST } from "@/config/request/axios/axiosInstance";
export const AddressInsertfetchData = async (Addressdata) => {
    const response = await POST({
        url: paths.Address.basic.path,
        data: {
            customer: Addressdata.customer,
            address: Addressdata.address,
            phoneNumber: Addressdata.phoneNumber,
            submissionDate: Addressdata.submissionDate,
            acreage: Addressdata.acreage,
            cleanType: Addressdata.cleanType,
        },
    });
    return response;
};
export const AddressSelectfetchData = async (page) => {
    return await GET({
        url: paths.Address.search.defaul.path,
        params: {
            page,
        },
    });
};
export const AddressDeletefetchData = async (AddressId) => {
    return await DELETE({
        url: `${paths.Address.basic.path}?addressId=${AddressId}`, // 주소 ID를 쿼리 파라미터로 전달
    });
};
