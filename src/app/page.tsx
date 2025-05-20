import ThemeSwitch from "@/components/theme-switch"
import LanguageSwitch from "@/components/language-switch";
import InputRequest from "@/components/input-request"
import {useTranslations} from 'next-intl';

export default function Home() {
  const t_general = useTranslations('General');
  const t_input_page = useTranslations('InputPage');

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-50
      font-[family-name:var(--font-geist-sans)] text-sm lg:text-base min-w-screen min-h-screen
      flex flex-col items-center justify-center gap-5 lg:gap-8 pt-14 pb-5 lg:pt-20 lg:pb-14">
      <InputRequest page_title={t_general('page_title')} openai_template={t_input_page('openai_template')} 
        request_wait={t_input_page('request_wait')} request_error={t_input_page('request_error')} 
        input_placeholder={t_input_page('input_placeholder')} button_send={t_input_page('button_send')} 
        clipboard_notification={t_input_page('clipboard_notification')} />
      <ThemeSwitch />
      <LanguageSwitch />
    </div>
  );
}
