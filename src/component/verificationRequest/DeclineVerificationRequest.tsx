import React, { useEffect, useState } from "react";
import Searching from "../../extra/Searching";
import Table from "../../extra/Table";
import Pagination from "../../extra/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getVerificationRequest,
  verificationRequestAccept,
  verificationRequestDecline,
} from "../../store/verificationRequestSlice";
import dayjs from "dayjs";
import { RootStore, useAppDispatch } from "@/store/store";
import { baseURL } from "@/util/config";
import useClearSessionStorageOnPopState from "@/extra/ClearStorage";

const DeclineVerificationRequest = () => {
  const { declinedData, totalDeclinedData } = useSelector(
    (state: RootStore) => state.verificationRequest
  );
  const dispatch = useAppDispatch();

  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [search, setSearch] = useState<string>();
  useClearSessionStorageOnPopState("multiButton")


  useEffect(() => {
    let payload: any = {
      start: page,
      limit: size,
      type: "declined",
    };
    dispatch(getVerificationRequest(payload));
  }, [page, size]);

  useEffect(() => {
    setData(declinedData);
  }, [declinedData]);

  const postReportTable = [
    {
      Header: "NO",
      body: "no",
      Cell: ({ index }: { index: number }) => (
        <span className="  text-nowrap">{(page - 1) * size + index + 1}</span>
      ),
    },
    {
      Header: "USER",
      body: "image",
      Cell: ({ row, index }: { row: any; index: number }) => (
        <>
        <img
          src={baseURL + row?.userId?.image}
          width="60px"
          height="60px"
          style={{ objectFit: "cover" }}
        />

        <span className="text-capitalize">{row?.userId?.name}</span>
        </>
      ),
    },
    {
      Header: "PROFILE SELFIE",
      body: "profileSelfie",
      Cell: ({ row, index }: { row: any; index: number }) => (
        <img
          src={baseURL + row?.profileSelfie}
          width="60px"
          height="60px"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      Header: "DOCUMENT",
      body: "document",
      Cell: ({ row, index }: { row: any; index: number }) => (
        <img
          src={baseURL +row?.document}
          width="60px"
          height="60px"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      Header: "DOCUMENT TYPE",
      body: "documentType",
      Cell: ({ row }: { row: any }) => (
        <span className="text-capitalize">{row?.nameOnDocument}</span>
      ),
    },

  
    {
      Header: "REASON",
      body: "reason",
      Cell: ({ row }: { row: any }) => (
        <span className="text-capitalize">{row?.reason}</span>
      ),
    },
    {
      Header: "DECLINED DATE",
      body: "updatedAt",
      Cell: ({ row }: { row: any }) => (
        <span className="text-capitalize">
          {row?.updatedAt ? dayjs(row?.updatedAt).format("DD MMMM YYYY") : ""}
        </span>
      ),
    },
  ];

  const handleFilterData = (filteredData: any) => {
    if (typeof filteredData === "string") {
      setSearch(filteredData);
    } else {
      setData(filteredData);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleRowsPerPage = (value: number) => {
    setPage(1);
    setSize(value);
  };

  return (
    <>
      <div className="userPage p-0">
        <div className="payment-setting-box user-table ">
          <div style={{ padding: "12px", position: "relative" }}>
            <h5
              style={{
                fontWeight: "500",
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "5px",
                padding: "3px",
              }}
            >
              Decline Verification Request Table
            </h5>
            <Searching
              placeholder={"Search..."}
              data={declinedData}
              label={"Search for ID, Keyword, Username,Name,Title,Reported "}
              type={"client"}
              setData={setData}
              onFilterData={handleFilterData}
              searchValue={search}
              actionShow={false}
            />
          </div>
          <div className="mt-3">
            <Table
              data={data}
              mapData={postReportTable}
              serverPerPage={size}
              serverPage={page}
              type={"server"}
            />
            <div className="mt-3">
              <Pagination
                type={"server"}
                activePage={page}
                rowsPerPage={size}
                userTotal={totalDeclinedData}
                setPage={setPage}
                handleRowsPerPage={handleRowsPerPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeclineVerificationRequest;
