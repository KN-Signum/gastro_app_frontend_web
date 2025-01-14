import { useTranslation } from 'react-i18next';

export default function GlobalHomePage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('home.title')}</h1>
    </div>
  );
}
