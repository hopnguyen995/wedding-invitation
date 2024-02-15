import { isMobile } from "react-device-detect";

// const MessengerButton = () => {
//   const openMessenger = () => {
//     const userThreadId = "USER_ID"; // Thay USER_ID bằng ID người dùng thích hợp
//     const messengerLink = isMobile
//       ? `fb-messenger://user-thread/${userThreadId}`
//       : `https://www.messenger.com/t/${userThreadId}`;

//     window.location.href = messengerLink;
//   };

//   return (
//     <div>
//       <button
//         className="p-[10px] bg-blue-500 text-[#fff] font-medium rounded-lg"
//         onClick={openMessenger}
//       >
//         GỬI LỜI CHÚC
//       </button>
//     </div>
//   );
// };

// export default MessengerButton;

const MessengerButton = () => {
  const userThreadId = "USER_ID"; // Thay USER_ID bằng ID người dùng thích hợp
  const messengerLink = isMobile
    ? `fb-messenger://user-thread/${userThreadId}`
    : `https://www.messenger.com/t/${userThreadId}`;

  return (
    <div>
      <a
        href={messengerLink}
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
