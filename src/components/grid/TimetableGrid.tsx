import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'uiw';

export default function TimetableGrid() {
  const { t } = useTranslation();
  const rowStyl: React.CSSProperties = {
    minWidth: '1000px',
    backgroundColor: 'rgba(230, 230, 230, 0.67)',
    marginBottom: 10,
  };

  let rowLabels: string[] = t('grid.weekdays', {
    returnObjects: true,
  }) as unknown as string[];

  const columnLabels = [
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];
  // 16 of hours,

  const Box: React.FC<{
    height?: string;
    width?: string;
    style?: React.CSSProperties;
    background?: string;
  }> = ({ height, width, style, background }) => (
    <div
      style={{
        ...style,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        background,
        width,
        height,
      }}
    ></div>
  );

  const Label: React.FC<{
    label: string;
    height?: string;
    width?: string;
    style?: React.CSSProperties;
    background?: string;
  }> = ({ label, height, width, style, background }) => (
    <div
      style={{
        ...style,
        textAlign: 'center',
        color: '#000',
        paddingTop: 5,
        paddingBottom: 5,
        background,
        width,
        height,
      }}
    >
      {label}
    </div>
  );

  const LabelCells = columnLabels.map((label, index) => (
    <Col span="2" key={index}>
      <Label label={label} />
    </Col>
  ));

  const Blank: React.FC<{
    title: string;
    height?: string;
    width?: string;
    style?: React.CSSProperties;
    background?: string;
  }> = ({ title, height, width, style, background = '#2EA3F4' }) => (
    <div
      style={{
        ...style,
        textAlign: 'center',
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
        background,
        width,
        height,
      }}
    >
      {title}
    </div>
  );
  return (
    <div style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
      <Row gutter={10} justify="flex-start" style={rowStyl}>
        <Col span="2">
          <Box />
        </Col>
        {LabelCells}
      </Row>
      <Row gutter={10} justify="flex-start" style={rowStyl}>
        <Col span="2" fixed>
          <Label label={rowLabels[0]} />
        </Col>
        <Col span="1">
          <Box />
        </Col>
        <Col span="4" fixed>
          <Blank title="patient x" />
        </Col>
      </Row>
      <Row gutter={10} justify="flex-start" style={rowStyl}>
        <Col span="1">
          <Label label={rowLabels[1]} />
        </Col>
      </Row>
      <Row gutter={10} justify="flex-start" style={rowStyl}>
        <Col span="1">
          <Label label={rowLabels[2]} />
        </Col>
      </Row>
      <Row gutter={10} justify="flex-start" style={rowStyl}>
        <Col span="1">
          <Label label={rowLabels[3]} />
        </Col>
      </Row>
      <Row
        gutter={10}
        justify="flex-start"
        style={{ ...rowStyl, marginBottom: 0 }}
      >
        <Col span="1">
          <Label label={rowLabels[4]} />
        </Col>
      </Row>
    </div>
  );
}
