import {Entity} from '@ngx-metaui/rules';

export class Supplier implements Entity {
  name: string;
  email: string;


  constructor(name: string, email?: string) {
    this.name = name;
    this.email = email;
  }

  className(): string {
    return 'Supplier';
  }

  getTypes(): any {
    return {
      name: String,
      email: String
    };
  }

  identity(): string {
    return this.name;
  }


}
