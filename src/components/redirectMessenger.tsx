import { isMobile } from "react-device-detect";

const MessengerButton = () => {
  const messengerLink = isMobile ? `fb-messenger://` : `https://m.me/yourfacebookprofilename`;

  return (
    <div>
      <a
        href={messengerLink}
        // href={
        //   true
        //     ? `intent://open-messenger?playstore=com.facebook.orca&source=web`
        //     : `https://m.me/yourfacebookprofilename`
        // }
        target="_blank"
        rel="noopener noreferrer"
        className="p-[10px] bg-blue-500 text-[#fff] font-medium rounded-lg"
      >
        GỬI LỜI CHÚC
      </a>
    </div>
  );
};

export default MessengerButton;
