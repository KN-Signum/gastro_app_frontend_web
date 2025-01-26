import { useNavigate } from 'react-router-dom';
import { Col, Menu, MenuItem, Row } from 'uiw';

interface LogoProps {
  className: string;
}

export default function Logo({ className }: LogoProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <Row justify="flex-start" gutter={20}>
      <Col fixed>
        <Menu bordered className={className}>
          <MenuItem text="GastroApp" onClick={handleLogoClick} />
        </Menu>
      </Col>
    </Row>
  );
}
