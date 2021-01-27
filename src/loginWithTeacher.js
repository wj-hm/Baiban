import { request } from "@cyber-library/request";

export default async () => {
  try {
    await request({
      method: "POST",
      url: "/api/user/login",
      body: {
        username: "孔丘",
        password: "yy20160315",
      },
    });
  } catch (error) {
    throw error;
  }
};
