'use client';
import { NextIntlClientProvider } from "next-intl";
import { getMessages, DEFAULT_LOCALE } from ".";
import { NextUIProvider } from "@nextui-org/system";
import '@suiet/wallet-kit/style.css';
import { OnbordaProvider } from "onborda";
import { GlobalContextProvider } from "@/Context/store";

// eslint-disable-next-line react/function-component-definition
export default async function LocaleProvider(props) {
  const { children, locale = DEFAULT_LOCALE } = props;

  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GlobalContextProvider>
        <NextUIProvider>
          <OnbordaProvider>
            {children}
          </OnbordaProvider>
        </NextUIProvider>
      </GlobalContextProvider>
    </NextIntlClientProvider>
  );
}
