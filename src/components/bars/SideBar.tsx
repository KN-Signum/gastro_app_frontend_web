import { useTranslation } from 'react-i18next';
import { Col, Menu, MenuItem, Row } from 'uiw';
import './SideBar.css';

export default function SideNavBar() {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Row align="middle">
          <Col>
            <img src="/logo.svg" alt="GastroApp Logo" style={{ width: '70%' }} />
          </Col>
          <Col>
            <span className="sidebar-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>GastroApp</span>
          </Col>
        </Row>
      </div>
      <Row justify="flex-start" gutter={20}>
        <Col fixed>
          <Menu className="menu-large" bordered>
            <MenuItem
              className="menu-item-large"
              icon="dashboard"
              text={t('sidebar.dashboard')}
              href="/dashboard"
            />
            <MenuItem
              className="menu-item-large"
              icon="verification"
              text={t('sidebar.patients')}
              href="/patients"
            />
            <MenuItem
              className="menu-item-large"
              icon="date"
              text={t('sidebar.calendar')}
              href="/calendar"
            />
            <MenuItem
              className="menu-item-large"
              icon="question-circle-o"
              text={t('sidebar.help')}
              href="/help"
            />
            <MenuItem
              className="menu-item-large"
              icon="setting-o"
              text={t('sidebar.settings')}
              href="/settings"
            />
          </Menu>
        </Col>
      </Row>
    </div>
  );
}
