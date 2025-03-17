// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/diary");
//   return null;
// }

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/auth/login");
  } else {
    redirect("/diary");
  }

  return null;
}
