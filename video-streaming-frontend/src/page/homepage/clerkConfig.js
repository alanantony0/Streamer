import { initClerk } from "@clerk/react-sdk";

initClerk({
  appId: process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY,
});

export default { initClerk };
