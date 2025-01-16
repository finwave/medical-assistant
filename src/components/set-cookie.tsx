"use server";

import { cookies } from "next/headers";

export async function setLocaleCookie(locale : string) {
    const cookieName = "i18nlang";
    const cookieStore = await cookies();
    cookieStore.set(cookieName, locale);

    cookieStore.set(cookieName, locale, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
      })
}