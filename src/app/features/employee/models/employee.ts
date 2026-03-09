export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;
  jmbg: string;
  address: string;
  birthDate: string;
  status: boolean;
  role: 'Admin' | 'Regular'; 
  permissions: string[];     
}