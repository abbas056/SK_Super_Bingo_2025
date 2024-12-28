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
export const w1Rotation = (descrip, setFirstWheel) => {
  if (descrip.includes("Game Master room skin")) {
    setFirstWheel("w1rotate1");
  } else if (descrip.includes("gems")) {
    setFirstWheel("w1rotate2");
  } else if (descrip.includes("SVIP")) {
    setFirstWheel("w1rotate3");
  } else if (descrip.includes("Game Master Battle frame")) {
    setFirstWheel("w1rotate4");
  } else if (descrip.includes("MasterMind room skin")) {
    setFirstWheel("w1rotate5");
  } else if (descrip.includes("MasterMind frame")) {
    setFirstWheel("w1rotate6");
  } else {
    setFirstWheel("w1rotate0");
  }
};
export const w2Rotation = (description, setSecondWheel) => {
  if (description.includes("Bumblebee entrance")) {
    setSecondWheel("w2rotate0");
  } else if (description.includes("Enlightening Room Skin")) {
    setSecondWheel("w2rotate1");
  } else if (description.includes("gems")) {
    setSecondWheel("w2rotate2");
  } else if (description.includes("SVIP")) {
    setSecondWheel("w2rotate3");
  } else if (description.includes("Game Master Battle frame")) {
    setSecondWheel("w2rotate4");
  } else if (description.includes("Game Master room skin")) {
    setSecondWheel("w2rotate5");
  } else if (description.includes("MasterMind room skin")) {
    setSecondWheel("w2rotate6");
  } else if (description.includes("MasterMind frame")) {
    setSecondWheel("w2rotate7");
  }
};
export const estBeans = (eventGifting, value, rank) => {
  let beans;
  if (eventGifting) {
    if (rank == 1) {
      beans = Math.floor((value * 40) / 100);
    } else if (rank == 2) {
      beans = Math.floor((value * 30) / 100);
    } else if (rank == 3) {
      beans = Math.floor((value * 10) / 100);
    } else if (rank == 4) {
      beans = Math.floor((value * 10) / 100);
    } else if (rank == 5) {
      beans = Math.floor((value * 10) / 100);
    }
  } else {
    if (rank == 1) {
      beans = Math.floor((value * 50) / 100);
    } else if (rank == 2) {
      beans = Math.floor((value * 30) / 100);
    } else if (rank == 3) {
      beans = Math.floor((value * 20) / 100);
    }
  }
  return beans;
};
