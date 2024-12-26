import axios from "axios";
import { unknown } from "../utils/images";
import crossBtn from "../assets/popups/crossbtn.png";

export const overFlowAuto = () => {
  if (typeof window != "undefined" && window.document) {
    document.body.style.overflow = "auto";
  }
};
export const overFlowHidden = () => {
  if (typeof window != "undefined" && window.document) {
    document.body.style.overflow = "hidden";
  }
};
export const currencySlang = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
};
export const slicePlease = (array, from, to) => {
  const cutting = array?.slice(from, to);
  return cutting;
};
export const formatData = (originalArray) => {
  const newArray = [];
  for (let i = 0; i < originalArray?.length; i += 3) {
    newArray?.push(originalArray?.slice(i, i + 3));
  }
  return newArray;
};
export function goTo(isLive, userId, roomId) {
  if (window.UA.android) {
    let url = "streamkar://m.streamkar.com/route";
    if (isLive) {
      url = url + "/room?roomId=" + roomId;
    } else {
      url = url + "/user?userId=" + userId;
    }
    if (userId || roomId) {
      window.phone.routeViewPage(url);
    }
  } else {
    window.location.href = "http://www.kktv1.com/m/?roomid=" + userId + "";
  }
}
export const callDartApi = async (url, uid, uToken) => {
  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      userId: uid,
      token: uToken,
    },
  };
  const result = await axios.request(config);
  return result.data;
};
export const captureImageError = (event) => {
  event.target.src = unknown;
  return true;
};
export const cross = () => {
  let cross;
  cross = crossBtn;
  return cross;
};
export const successAlert = (yayy, data) => [
  {
    headtext: `${yayy}`,
    data: <>{data}</>,
  },
];
export const unsuccessAlert = (oops, msj) => [
  {
    headtext: `${oops}`,
    data: <>{msj}</>,
  },
];
