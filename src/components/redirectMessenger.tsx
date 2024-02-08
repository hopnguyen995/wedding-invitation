import { isMobile } from "react-device-detect";

const MessengerButton = () => {
  const openMessenger = () => {
    if (isMobile) {
      // Mở ứng dụng Messenger trên điện thoại
      window.location.href = "fb-messenger://user-thread/USER_ID";
    } else {
      // Mở Messenger trong trình duyệt trên máy tính
      window.open("https://www.messenger.com/t/USER_ID", "_blank");
    }
  };

  return (
    <div>
      <button
        className="p-[10px] bg-blue-500 text-[#fff] font-medium rounded-lg"
        onClick={openMessenger}
      >
        GỬI LỜI CHÚC
      </button>
    </div>
  );
};

export default MessengerButton;
