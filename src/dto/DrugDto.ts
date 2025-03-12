/**
 * DTO represent details about adding a drug
 */
export class CreateDrugDto {
  name: string = '';
  dosage: string = '';
  dateFrom: string = '';
  dateTo: string = '';
  additionalInfo: string = '';
  doses_taken: number = 0;
  doses_left: number = 0;
}
