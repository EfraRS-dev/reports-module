import { Report } from './interfaz';

export class Director {
  builder: Report;
  constructor(builder: Report) {
    this.builder = builder;
  }

  async build() {
    const data = await this.builder.consultModule();
    const stadistics = this.builder.makeStadistics(data);
    this.builder.generateReport(data, stadistics);
  }
}
