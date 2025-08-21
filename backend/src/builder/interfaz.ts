

export interface Report <T = any> {
    report: {
        dataTable: any[];
        dataGraphicOne: any;
        dataGraphicTwo: any;
    }
    consultModule(): Promise<any>;
    makeStadistics(data: any[]): any;
    generateReport(dataTable: any[], stadistics: any): any;
    getreport(): T;
}