import { Fontname, LastButton } from "@/SCSS/Fixed";
import { AddressType } from "@/types/Feature/Address/AddressType";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { Key, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AddressDeletefetchData, AddressSelectfetchData } from "../api/util";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;
`;

const MainBox = styled.div`
  width: 75%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const Label = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 1rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.75rem;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  td {
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    display: none; /* 모바일에서는 테이블 숨김 */
  }
`;

const CardList = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 2px solid #ccc; /* 더 두껍고 진하게 */

  span.label {
    font-weight: 600;
    color: #222;
    width: 40%;
  }

  span.value {
    text-align: right;
    color: #444;
    width: 60%;
    word-break: break-word;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DeleteButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 0.8rem;
  border: none;
  background-color: #ff4d4f;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #d9363e;
  }
`;

export const ManagerJoin = () => {
  const [Sign, setSign] = useState<null | AddressType[]>(null);
  const navigate = useNavigate();
  const TotalPage = useRef(0);
  const [refreshKey, setrefreshKey] = useState<boolean>(false);
  const [currentPage, setcurrentPage] = useState<number>(0);
  const FuncClick = (name: string) => {
    navigate(name);
  };

  useEffect(() => {
    AddressSelectfetchData(TotalPage.current).then((res) => {
      setSign(res.pageDTO.list);
      TotalPage.current = res.pageDTO.pageCount;
    });
  }, [refreshKey]);

  const handleClick = (AddressId: string) => {
    AddressDeletefetchData(AddressId)
      .then((res) => {
        if (res.resultType === "success") {
          AddressSelectfetchData(TotalPage.current).then((res) => {
            Swal.fire({
              title: "삭제 성공",
              text: "청소 예약 정보가 삭제되었습니다.",
              icon: "success",
              confirmButtonText: "확인",
            });
            setSign(res.pageDTO.list);
            setrefreshKey(!refreshKey);
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "삭제 실패",
          text: "청소 예약 정보 삭제에 실패했습니다. 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
        console.error("삭제 실패:", err);
      });
  };

  return (
    <MainWapper>
      <MainBox>
        <Fontname>온라인 예약 관리</Fontname>
        <Label>청소 날짜가 지난 데이터는 자동 삭제 됩니다.</Label>

        {/* 데스크탑 테이블 */}
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>청소유형</th>
                <th>고객명</th>
                <th>주소</th>
                <th>전화번호</th>
                <th>날짜</th>
                <th>평수</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {Sign && Sign.length !== 0 ? (
                Sign.map((date: AddressType, index: Key) => (
                  <tr key={index}>
                    <td>{date.cleanType}</td>
                    <td>{date.customer}</td>
                    <td>{date.address}</td>
                    <td>{date.phoneNumber}</td>
                    <td>{date.submissionDate}</td>
                    <td>{date.acreage}</td>
                    <td>
                      <button
                        onClick={() =>
                          date.addressId && handleClick(date.addressId)
                        }
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#2563eb",
                      fontWeight: "bold",
                    }}
                  >
                    최근 한달에 해당하는 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>

        {/* 모바일 카드형 뷰 */}
        <CardList>
          {Sign && Sign.length !== 0 ? (
            Sign.map((date: AddressType, index: Key) => (
              <Card key={index}>
                <CardRow>
                  <span className="label">청소유형</span>
                  <span className="value">{date.cleanType}</span>
                </CardRow>
                <CardRow>
                  <span className="label">고객명</span>
                  <span className="value">{date.customer}</span>
                </CardRow>
                <CardRow>
                  <span className="label">주소</span>
                  <span className="value">{date.address}</span>
                </CardRow>
                <CardRow>
                  <span className="label">전화번호</span>
                  <span className="value">{date.phoneNumber}</span>
                </CardRow>
                <CardRow>
                  <span className="label">날짜</span>
                  <span className="value">{date.submissionDate}</span>
                </CardRow>
                <CardRow>
                  <span className="label">평수</span>
                  <span className="value">{date.acreage}</span>
                </CardRow>
                <DeleteButton
                  onClick={() => date.addressId && handleClick(date.addressId)}
                >
                  삭제
                </DeleteButton>
              </Card>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                backgroundColor: "#6ecf7e",
                lineHeight: "50px",
                height: "100px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  color: "#2563eb",
                  fontWeight: "bold",
                }}
              >
                최근 한달에 해당하는 데이터가 없습니다.
              </div>
            </div>
          )}
        </CardList>
        {TotalPage.current > 0 && (
          <div className="flex justify-center mt-3">
            <div className="flex items-center space-x-6 gap-10">
              <div className="flex items-center space-x-2 gap-5">
                <button
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  aria-label="이전 페이지"
                  onClick={() => {
                    if (currentPage <= 0) {
                      toast.error("첫 페이지입니다.", {
                        position: "top-center",
                      });
                      return;
                    }
                    setcurrentPage(currentPage - 1);
                  }}
                >
                  &lt;
                </button>
                {Array.from({ length: TotalPage.current }, (_, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-blue-100 focus:outline-none"
                    onClick={() => setcurrentPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                  aria-label="다음 페이지"
                  onClick={() => {
                    if (currentPage + 1 < TotalPage.current) {
                      setcurrentPage(currentPage + 1);
                    } else {
                      toast.error("마지막 페이지입니다.", {
                        position: "top-center",
                      });
                    }
                  }}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
        <LastButton
          onClick={() =>
            FuncClick(GateWayNumber.Manager + "/" + ManagerGateWayType.Address)
          }
        >
          정보 추가
        </LastButton>
      </MainBox>
    </MainWapper>
  );
};
