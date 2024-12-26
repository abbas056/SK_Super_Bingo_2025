// src/services/api.js

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baserUrl } from "../js/baserUrl";

const ApiContext = createContext();
function EventProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [bingoToday, setbingoToday] = useState([]);
  const [bingoPrevious, setbingoPrevious] = useState([]);
  const [talentDailyToday, settalentDailyToday] = useState([]);
  const [talentDailyYesterday, settalentDailyYesterday] = useState([]);
  const [talentOverall, settalentOverall] = useState([]);
  const [gifterDailyToday, setgifterDailyToday] = useState([]);
  const [gifterDailyYesterday, setgifterDailyYesterday] = useState([]);
  const [gifterOverall, setgifterOverall] = useState([]);
  const [tickertapeLuckyWheel, settickertapeLuckyWheel] = useState([]);
  const [tickertapeVipLuckyWheel, settickertapeVipLuckyWheel] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    uid: 0,
    token: undefined,
  });

  const isLive = false;
  const refreshApi = () => {
    setRefresh(!refresh);
  };

  const cd = new Date();
  // Get the previous day
  const pd = new Date(cd);
  pd.setDate(cd.getDate() - 1);
  // Function to format a date in "YYYY-MM-DD" format
  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const CurrentDate = formatDate(cd);
  const PreviousDate = formatDate(pd);

  const now = new Date();
  const hrs = now.getUTCHours();
  const currentHours = hrs === 0 ? 0 : hrs;
  const previousHours = hrs === 0 ? 23 : hrs - 1;

  useEffect(() => {
    try {
      window.phone.getUserInfo(function (userInfo) {
        setUser({
          uid: userInfo.userId > 0 ? userInfo.userId : 0,
          token: userInfo.token !== "" ? userInfo.token : null,
        });
      });
      //  setUser({
      //    uid: 596492375,
      //    token: "A12E6D5EB514534219948C187C8BDD6210",
      //  });
    } catch (_error) {
      setUser({
        uid: 0,
        token: "",
      });
      console.error("Can't get userInfo by window.phone.getUserInfo");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (user.uid > 0) {
      axios
        .get(`${baserUrl}api/activity/bingo/getUserEventInfo?userId=${user.uid}`)
        .then((response) => {
          setUserInfo(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false); // Ensure loading state is handled even on error
        });
    }
  }, [user, refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=15&pageNum=1&pageSize=20&dayIndex=2023-12-26`)
      .then((response) => {
        setbingoToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=15&pageNum=1&pageSize=20&dayIndex=2023-12-25`)
      .then((response) => {
        setbingoPrevious(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=14&pageNum=1&pageSize=20&dayIndex=2023-12-26`)
      .then((response) => {
        settalentDailyToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=14&pageNum=1&pageSize=20&dayIndex=2023-12-25`)
      .then((response) => {
        settalentDailyYesterday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=12&pageNum=1&pageSize=20`)
      .then((response) => {
        settalentOverall(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=13&pageNum=1&pageSize=20&dayIndex=2023-12-26`)
      .then((response) => {
        setgifterDailyToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=13&pageNum=1&pageSize=20&dayIndex=2023-12-25`)
      .then((response) => {
        setgifterDailyYesterday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=11&pageNum=1&pageSize=20`)
      .then((response) => {
        setgifterOverall(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20250124_bingo&rankIndex=1&pageNum=1&pageSize=20`)
      .then((response) => {
        settickertapeLuckyWheel(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20250124_bingo&rankIndex=2&pageNum=1&pageSize=20`)
      .then((response) => {
        settickertapeVipLuckyWheel(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  return (
    <div>
      <ApiContext.Provider
        value={{
          isLoading,
          setIsLoading,
          refreshApi,
          isLive,
          CurrentDate,
          PreviousDate,
          userId: user?.uid,
          userToken: user?.token,
          userInfo: userInfo?.data,
          bingoToday: bingoToday?.data,
          bingoPrevious: bingoPrevious?.data,
          talentDailyToday: talentDailyToday?.data,
          talentDailyYesterday: talentDailyYesterday?.data,
          talentOverall: talentOverall?.data,
          gifterDailyToday: gifterDailyToday?.data,
          gifterDailyYesterday: gifterDailyYesterday?.data,
          gifterOverall: gifterOverall?.data,
          tickertapeLuckyWheel: tickertapeLuckyWheel?.data,
          tickertapeVipLuckyWheel: tickertapeVipLuckyWheel?.data,
        }}
      >
        {children}
      </ApiContext.Provider>
    </div>
  );
}

export { ApiContext, EventProvider };
