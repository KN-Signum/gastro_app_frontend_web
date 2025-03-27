import { useNavigate } from 'react-router-dom';
import { Col, Menu, MenuItem, Row } from 'uiw';

/**
 * displays logo
 * click at logo navigate to the \home page
 */

interface LogoProps {
  className: string;
}

export default function Logo({ className }: LogoProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <Row gutter={2}>
      <Col>
        <Menu bordered className={className}>
          <MenuItem
            style={{
              height: '80%',
              width: '300%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            text="GastroApp"
            onClick={handleLogoClick}
          />
        </Menu>
      </Col>
    </Row>
  );
}
