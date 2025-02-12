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
  const [talentWheel, setTalentWheel] = useState([]);
  const [tickertapeTab2, setTickertapeTab2] = useState([]);
  const [disable, setDisable] = useState(false);
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
  const pd = new Date(cd);
  pd.setDate(cd.getDate() - 1);
  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const CurrentDate = formatDate(cd);
  const PreviousDate = formatDate(pd);

  useEffect(() => {
    try {
      window.phone.getUserInfo(function (userInfo) {
        setUser({
          uid: userInfo.userId > 0 ? userInfo.userId : 0,
          token: userInfo.token !== "" ? userInfo.token : null,
        });
      });
    } catch (_error) {
      setUser({
        uid: 596492375,
        token: "A133C5E90A8E0149049B9BED8DE1A77EF1",
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
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=15&pageNum=1&pageSize=20&dayIndex=${CurrentDate}`)
      .then((response) => {
        setbingoToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=15&pageNum=1&pageSize=20&dayIndex=${PreviousDate}`)
      .then((response) => {
        setbingoPrevious(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=14&pageNum=1&pageSize=20&dayIndex=${CurrentDate}`)
      .then((response) => {
        settalentDailyToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=14&pageNum=1&pageSize=20&dayIndex=${PreviousDate}`)
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
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=13&pageNum=1&pageSize=20&dayIndex=${CurrentDate}`)
      .then((response) => {
        setgifterDailyToday(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getLeaderboardInfoV2?eventDesc=20250124_bingo&rankIndex=13&pageNum=1&pageSize=20&dayIndex=${PreviousDate}`)
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
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20250124_bingo&rankIndex=2&pageNum=1&pageSize=20`)
      .then((response) => {
        setTalentWheel(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baserUrl}api/activity/eidF/getWinnerRankInfo?eventDesc=20250124_bingo&rankIndex=1&pageNum=1&pageSize=20`)
      .then((response) => {
        setTickertapeTab2(response.data);
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
          disable,
          setDisable,
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
          talentWheel: talentWheel?.data,
          tickertapeTab2: tickertapeTab2?.data,
        }}
      >
        {children}
      </ApiContext.Provider>
    </div>
  );
}

export { ApiContext, EventProvider };
