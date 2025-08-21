// report-exporter.template.ts
export abstract class ReportExporterTemplate {
  async export(reportData: any): Promise<ArrayBuffer> {
    const preparedData = this.prepareData(reportData);
    return this.render(preparedData);
  }

  protected prepareData(data: any): any[] {
    return Array.isArray(data) ? data : [data];
  }

  protected abstract render(data: any[]): Promise<ArrayBuffer>;
}
