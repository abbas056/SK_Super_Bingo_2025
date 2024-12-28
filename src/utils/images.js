import header from "../assets/Header.png";
import unknown from "../assets/unknown.png";
import bingoBtn from "../assets/Bingo.png";
import talentWheelBtn from "../assets/TalentWheel.png";
import gamePointsIcon from "../assets/MyGamePointsIcon.png";
import bingoWinsIcon from "../assets/DailyBingoWinsIcon.png";
import beanIcon from "../assets/bean.png";
import rewardsTag from "../assets/Reward.png";
import beanPot from "../assets/BeansPot.png";
import gemspot from "../assets/gemspot.png";
import gemsbag from "../assets/gemsbag.png";
import leftArrow from "../assets/PrevButton.png";
import rightArrow from "../assets/NextButton.png";
import frame1 from "../assets/1stFrame.png";
import frame2 from "../assets/2ndFrame.png";
import frame3 from "../assets/3rdFrame.png";
import onwardFrame from "../assets/onwardFrame.png";
import talentPtsIcon from "../assets/MyTalentpointsIcon.png";
import talentWheelTitle from "../assets/TalentWheelTitle.png";
import luckyWheelBtn from "../assets/LuckyWheelButton.png";
import VipluckyWheelBtn from "../assets/VIPLuckyWheelBtn.png";
import luckyWheelInner from "../assets/LuckyWheelinner.png";
import vipluckyWheelInner from "../assets/Vipwheelinner.png";
import spinBtn from "../assets/SpinButton.png";
import star from "../assets/Star1.png";
import bingoPlayBtn from "../assets/BingoButton.png";
import down from "../assets/down-Arrow.png";
import right from "../assets/down-Arrow.png";
import guideTitle from "../assets/popups/Guide/title.png";
import bingoTitle from "../assets/popups/Guide/bingo.png";
import giftingTitle from "../assets/popups/Guide/eventgifting.png";
import wheelTitle from "../assets/popups/Guide/talentwheel.png";
import eventGiftingTitle from "../assets/popups/EventGifting/title.png";
import leaderboardTitle from "../assets/LeaderboardTitle.png";
import winnersTitle from "../assets/Winnerstitle.png";
import detailsTitle from "../assets/popups/Details/title.png";
import congratulationHead from "../assets/popups/congratulations.png";
import bingoHead from "../assets/popups/bingo.png";
import oopsHead from "../assets/popups/oops.png";
import gemIcon from "../assets/gems.png";
import bingoPopupImage from "../assets/BingoPopup1.png";
import btnUp from "../assets/BtnUppng.png";
import btnDown from "../assets/BtnDownpng.png";
import recordsTitle from "../assets/popups/Records/title.png";
import { baserUrl } from "../js/baserUrl";

export {
  header,
  unknown,
  bingoBtn,
  talentWheelBtn,
  gamePointsIcon,
  bingoWinsIcon,
  beanIcon,
  rewardsTag,
  beanPot,
  leftArrow,
  rightArrow,
  frame1,
  frame2,
  frame3,
  onwardFrame,
  talentPtsIcon,
  talentWheelTitle,
  luckyWheelBtn,
  VipluckyWheelBtn,
  luckyWheelInner,
  vipluckyWheelInner,
  spinBtn,
  star,
  bingoPlayBtn,
  down,
  right,
  btnUp,
  guideTitle,
  bingoTitle,
  giftingTitle,
  wheelTitle,
  eventGiftingTitle,
  leaderboardTitle,
  detailsTitle,
  congratulationHead,
  bingoHead,
  oopsHead,
  gemspot,
  gemsbag,
  gemIcon,
  bingoPopupImage,
  recordsTitle,
  btnDown,
  winnersTitle,
};
export function rewardImages(rewDesc) {
  var rewImg;
  if (rewDesc == "phantom Entrance" || rewDesc == "Phantom entrance" || rewDesc == "Phantom Entrance") {
    rewImg = baserUrl + "streamkar/rewards/phantom.png";
  } else if (rewDesc == "Victory Slide entrance" || rewDesc == "Victory slide Entrance") {
    rewImg = baserUrl + "streamkar/rewards/victorySlide.png";
  } else if (rewDesc == "Thunder Audio broadcast theme") {
    rewImg = baserUrl + "streamkar/rewards/thunderRoomskin.png";
  } else if (rewDesc == "VIP") {
    rewImg = baserUrl + "streamkar/rewards/vip.png";
  } else if (rewDesc == "SVIP") {
    rewImg = baserUrl + "streamkar/rewards/svip.png";
  } else if (rewDesc == "Beans" || rewDesc == "beans") {
    rewImg = baserUrl + "streamkar/rewards/beanbag.png";
  } else if (rewDesc == "Premier Profile Frame") {
    rewImg = baserUrl + "streamkar/rewards/premierFrame.png";
  } else if (rewDesc == "Kingpin Profile Frame") {
    rewImg = baserUrl + "streamkar/rewards/kingpinFrame.png";
  } else if (rewDesc == "Rusty Ranger entrance") {
    rewImg = baserUrl + "streamkar/rewards/rustyRanger.png";
  } else if (rewDesc == "Monarch Audio Theme") {
    rewImg = baserUrl + "streamkar/rewards/monarchRoom.png";
  } else if (rewDesc == "Spaceship entrance") {
    rewImg = baserUrl + "streamkar/rewards/spaceship.png";
  } else if (rewDesc == "Sea Wolf Profile Frame") {
    rewImg = baserUrl + "streamkar/rewards/seawolfFrame.png";
  } else if (rewDesc == "Fury Profile Frame") {
    rewImg = baserUrl + "streamkar/rewards/furyFrame.png";
  } else if (rewDesc == "Discoverer Audio Theme") {
    rewImg = baserUrl + "streamkar/rewards/discovererAudioTheme.png";
  } else if (rewDesc == "Safari Champion Profile Frame") {
    rewImg = baserUrl + "streamkar/rewards/safariDesertframe.png";
  } else if (rewDesc == "Voyager Profile Frame") {
    rewImg = baserUrl + "streamkar/rewards/voyagerProfileFrame.png";
  } else if (rewDesc == "Bunny profile frame") {
    rewImg = baserUrl + "streamkar/rewards/bunnyFrame.gif";
  } else if (rewDesc == "Fish World audio theme") {
    rewImg = baserUrl + "streamkar/rewards/fishWorldRoomskin.png";
  } else if (rewDesc == "Thunder room skin") {
    rewImg = baserUrl + "streamkar/rewards/thunderRoomskin.png";
  } else if (rewDesc == "Enchanted frame") {
    rewImg = baserUrl + "streamkar/rewards/enchantedFrame.png";
  } else if (rewDesc == "Gold Luxury entrance") {
    rewImg = baserUrl + "streamkar/rewards/goldLuxury.png";
  } else if (rewDesc == "Frosty Frame") {
    rewImg = baserUrl + "streamkar/rewards/frostyFrame.png";
  } else if (rewDesc == "Sea Wolf room skin") {
    rewImg = baserUrl + "streamkar/rewards/seaWolfRoomSkin.png";
  } else if (rewDesc == "Game Master room skin") {
    rewImg = baserUrl + "streamkar/rewards/gameMasterRoomSkin.png";
  } else if (rewDesc == "gems") {
    rewImg = baserUrl + "streamkar/rewards/gems.png";
  } else if (rewDesc == "MasterMind room skin") {
    rewImg = baserUrl + "streamkar/rewards/noRew.png";
  } else if (rewDesc == "Game Master Battle frame") {
    rewImg = baserUrl + "streamkar/rewards/gameMasterFarme.png";
  } else if (rewDesc == "MasterMind frame") {
    rewImg = baserUrl + "streamkar/rewards/noRew.png";
  } else if (rewDesc == "Bumblebee entrance") {
    rewImg = baserUrl + "streamkar/rewards/bumblebee.png";
  } else if (rewDesc == "Enlightening Room Skin") {
    rewImg = baserUrl + "streamkar/rewards/enlighteningRoom.png";
  } else {
    rewImg = baserUrl + "streamkar/rewards/noRew.png";
  }
  return rewImg;
}
