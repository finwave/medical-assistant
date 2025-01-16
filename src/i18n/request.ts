import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  let locale = 'en';

  const cookieName = "i18nlang";
  const cookieStore = await cookies();

  if (cookieStore.has(cookieName)) {
    const cookie = cookieStore.get(cookieName);

    if (cookie) {
      locale = cookie.value;
    }
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});