import { useTranslation } from 'react-i18next';
import { Card, Icon } from 'uiw';

interface InfoCardProps {
  title: string;
  icon: 'document' | 'verification' | 'warning-o';
  subtitle: string;
  number: number;
  link: string;
}

export default function InfoCard({
  title,
  icon,
  subtitle,
  number,
  link,
}: InfoCardProps) {
  const { t } = useTranslation();
  const titleStyle = icon === 'warning-o' ? { color: 'red' } : {};
  return (
    <Card
      active
      title={
        <span style={titleStyle}>
          <Icon type={icon} style={{ marginRight: 8 }} />
          {t(title)}
        </span>
      }
      bordered
      extra={
        <a href={link}>
          <Icon type="d-arrow-right" />
        </a>
      }
      style={{ width: 300 }}
    >
      <h1 style={titleStyle}>{number}</h1>
      <h3 style={titleStyle}>{t(subtitle)}</h3>
    </Card>
  );
}
