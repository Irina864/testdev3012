import { useEffect, useState } from "react";
import DetailedCookieNotice from "./DetailedCookieNotice";
import ShortCookieNotice from "./ShortCookieNotice";
const CookieNoticeContainer = () => {
  const [isAccepted, setIsAccepted] = useState(true);
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    setIsAccepted(cookiesAccepted === "true");
  }, []);

  const handleAccept = () => {
    setIsAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  const handleShowMore = () => {
    setShowDetailed(true);
  };

  if (isAccepted) {
    return null;
  }

  return showDetailed ? (
    <DetailedCookieNotice onAccept={handleAccept} />
  ) : (
    <ShortCookieNotice onAccept={handleAccept} onShowMore={handleShowMore} />
  );
};

export default CookieNoticeContainer;
