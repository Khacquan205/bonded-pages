import { login } from "./auth.js";

// One-time interactive setup: run `npm run login`, scan the QR with the
// spare Zalo account, then credentials.json holds the session for good.
const api = await login();
const profile = await api.fetchAccountInfo();
console.log("Đăng nhập với tài khoản:", profile);
process.exit(0);
