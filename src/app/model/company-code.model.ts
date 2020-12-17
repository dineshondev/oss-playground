import {Entity} from '@ngx-metaui/rules';

export class CompanyCode implements Entity {
  name: string;
  description: string;


  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  className(): string {
    return 'CompanyCode';
  }

  getTypes(): any {
    return {
      name: String,
      description: String
    };
  }

  identity(): string {
    return this.name;
  }


}
