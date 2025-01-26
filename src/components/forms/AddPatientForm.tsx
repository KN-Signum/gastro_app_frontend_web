import React from 'react';
import { Form, Input, Row, Col, Button, Notify } from 'uiw';
import './AddPatientForm.css';
import { useTranslation } from 'react-i18next';
import { GastroappClient } from '../../api/gastroapp-client';
import { CreatePatientDto } from '../../dto/PatientDto';

class ValidationError extends Error {
  filed: { [key: string]: string };

  constructor(filed: { [key: string]: string }) {
    super('Validation Error');
    this.filed = filed;
  }
}

export default function AddPatientForm() {
  const { t } = useTranslation();
  const client = new GastroappClient();

  return (
    <div className="patient-from">
      <Form
        onSubmit={async ({ initial, current }) => {
          const errorObj: { [key: string]: string } = {};
          if (!current.name) {
            errorObj.name = t('drug.errors.name_required');
          }
          if (!current.email) {
            errorObj.email = t('login.email_not_empty');
          }
          if (!current.phone_number) {
            errorObj.phone_number = t(
              'full-patient-list.phone_number_not_empty'
            );
          }
          if (!current.password) {
            errorObj.password = t('login.password_not_empty');
          }
          if (!current.weight) {
            errorObj.weight = t('full-patient-list.weigth_not_empty');
          }
          if (!current.height) {
            errorObj.height = t('full-patient-list.height_not_empty');
          }
          if (!current.age) {
            errorObj.age = t('full-patient-list.age_not_empty');
          }
          if (Object.keys(errorObj).length > 0) {
            throw new ValidationError(errorObj);
          }

          const data: CreatePatientDto = {
            name: current.name,
            email: current.email,
            phone_number: current.phone_number,
            password: current.password,
            weight: current.weight,
            height: current.height,
            age: current.age,
          };

          try {
            const response = await client.createPatient(data);
            if (response.status === 200 || response.status === 201) {
              Notify.success({
                title: t('notify.success'),
                description: response.data,
              });
            } else {
              Notify.error({
                title: t('notify.error'),
                description: response.data,
              });
            }
          } catch (error) {
            Notify.error({
              title: t('notify.error'),
              description: t('patient.creation_failed'),
            });
          }
        }}
        onSubmitError={(error) => {
          if (error.filed) {
            return { ...error.filed };
          }
          return null;
        }}
        fields={{
          name: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('patient-list.full_name'),
            children: <Input />,
          },
          email: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('login.email'),
            children: <Input type="email" />,
          },
          phone_number: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('full-patient-list.phone_number'),
            children: <Input type="tel" maxLength={10} />,
          },
          password: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('login.password'),
            children: <Input />,
          },
          weight: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('full-patient-list.weigth'),
            children: <Input type="number" />,
          },
          height: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('full-patient-list.height'),
            children: <Input type="number" />,
          },
          age: {
            labelClassName: 'fieldLabel',
            labelStyle: { width: 60 },
            inline: true,
            label: t('full-patient-list.age'),
            children: <Input type="number" />,
          },
        }}
      >
        {({ fields, state, canSubmit }) => {
          console.log('fields:', state);
          return (
            <div>
              <Row gutter={10} style={{ marginBottom: 10 }}>
                <Col>{fields?.name}</Col>
                <Col>{fields?.email}</Col>
              </Row>
              <Row gutter={10}>
                <Col>{fields?.phone_number}</Col>
                <Col>{fields?.password}</Col>
              </Row>
              <Row gutter={10}>
                <Col>{fields?.weight}</Col>
                <Col>{fields?.height}</Col>
              </Row>
              <Row gutter={10}>
                <Col>{fields?.age}</Col>
              </Row>
              <Row gutter={10}>
                <Col />
                <Col fixed align="bottom">
                  <Button
                    disabled={!canSubmit?.()}
                    type="primary"
                    htmlType="submit"
                  >
                    {t('patient.submit')}
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }}
      </Form>
    </div>
  );
}
