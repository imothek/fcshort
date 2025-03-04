import RootLayout from "../component/layout/Layout";
import React, { useEffect, useState } from "react";
import NewTitle from "../extra/Title";
import MultiButton from "../extra/MultiButton";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch for TypeScript inference
import dayjs from "dayjs";
import FakeUser from "../component/user/FakeUser";
import User from "../component/user/User";
import NewFakeUser from "../component/user/NewFakeUser";
import UserSetting from "../component/user/UserSetting";
import { RootStore, useAppSelector } from "../store/store"; // Assuming RootState is defined in the Redux store
import VerifiedUser from "@/component/user/VerifiedUser";
import useClearSessionStorageOnPopState from "@/extra/ClearStorage";

interface ManageUserProps {
  // Define props if any
}

const ManageUser = (props) => {
  const dispatch = useDispatch(); // Added dispatch variable with type inference

  const { dialogue, dialogueType, dialogueData } = useAppSelector(
    (state: RootStore) => state.dialogue
  );

  const [dayAnalytics, setDayAnalytics] = useState<string>("today");
  const [multiButtonSelect, setMultiButtonSelect] = useState<string>("User");
  const [startDate, setStartDate] = useState<string | Date>("All"); // Updated type
  const [endDate, setEndDate] = useState<string | Date>("All"); // Updated type
  useClearSessionStorageOnPopState("multiButton")


  const startDateFormat = (startDate: string | Date): string => {
    return startDate && dayjs(startDate).isValid()
      ? dayjs(startDate).format("YYYY-MM-DD")
      : "All";
  };

  const endDateFormat = (endDate: string | Date): string => {
    return endDate && dayjs(endDate).isValid()
      ? dayjs(endDate).format("YYYY-MM-DD")
      : "All";
  };

  const startDateData: string = startDateFormat(startDate);
  const endDateData: string = endDateFormat(endDate);

  return (
    <>
      <div className="userPage">
        <div
          style={{
            display: `${
              dialogueType === "manageUser"
                ? "none"
                : dialogueType === "hostSettleMent"
                ? "none"
                : dialogueType === "hostHistory"
                ? "none"
                : dialogueType === "fakeUserAdd"
                ? "none"
                : dialogueType === "fakeUser"
                ? "none"
                : dialogueType === "hostReport"
                ? "none"
                : "block"
            }`,
          }}
        >
          <div className="dashboardHeader primeHeader mb-3 p-0">
            <NewTitle
              dayAnalyticsShow={true}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              titleShow={false}
              setMultiButtonSelect={setMultiButtonSelect}
              multiButtonSelect={multiButtonSelect}
              name={`User`}
              labelData={["Real User", "Verified User" , "Fake User"]}
            />
          </div>
          {multiButtonSelect === "Real User" && (
            <User
              endDate={endDateData}
              startDate={startDateData}
              multiButtonSelectNavigate={setMultiButtonSelect}
            />
          )}
          {multiButtonSelect === "Fake User" && (
            <FakeUser
              endDate={endDateData}
              startDate={startDateData}
              setMultiButtonSelect={setMultiButtonSelect}
            />
          )}
          {multiButtonSelect === "Verified User" && (
            <VerifiedUser
              endDate={endDateData}
              startDate={startDateData}
              multiButtonSelectNavigate={setMultiButtonSelect}
            />
          )}
        </div>
        {dialogue && dialogueType === "fakeUser" && <NewFakeUser />}
        {dialogueType === "manageUser" && (
          <UserSetting
            multiButtonSelectNavigate={multiButtonSelect}
            multiButtonSelectNavigateSet={setMultiButtonSelect}
          />
        )}
      </div>
    </>
  );
};

ManageUser.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ManageUser;
