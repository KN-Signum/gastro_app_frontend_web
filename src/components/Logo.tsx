import { Col, Menu, MenuItem, Row } from 'uiw';

export default function Logo() {
  return (
    <Row justify="flex-start" gutter={20}>
      <Col fixed>
        <Menu bordered>
          <MenuItem text="GastroApp" />
        </Menu>
      </Col>
    </Row>
  );
}
