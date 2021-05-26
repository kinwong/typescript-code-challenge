import * as fs from 'fs';
import { promisify } from 'util';

import { InputRecord, OrderReport, OrdersReport, Report } from './records';

// As suggested in this article at: https://puruvj.dev/blog/fs-promises

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

/**
 * Reads an array of InputRecords from the specified path.
 * @param path The path where the array of InputRecords are read from.
 * @returns An array of InputRecords from the path.
 */
export const read = async (path: fs.PathLike): Promise<InputRecord[]> => {
  const data = await readFile(path, 'utf8');
  const records: InputRecord[] = await JSON.parse(data);
  return records;
};

/**
 * Writes the specified report as a file at specified path.
 * @param path The path of the report file.
 * @param report The report to write.
 */
export const write = async (path: fs.PathLike, report: Report): Promise<void> => {
  const json = JSON.stringify(report);
  await writeFile(path, json);
};

/**
 * Generates an array of order reports from the specified input record.
 * @param record The input record acts as the source.
 * @returns An array of order reports.
 */
const generateOrderReports = (record: InputRecord): OrderReport[] => {
  return Object.keys(record.order).map((name) => {
    const order = record.order[name];
    const report: OrderReport = {
      item: name,
      quantity: order.quantity,
      price: order.price,
      revenue: order.quantity * order.price
    };
    return report;
  });
};

/**
 * Transforms an input record to an orders-report.
 * @param record The input record to transform.
 * @returns An orders-report in the format instructed.
 */
const transformInputRecord = (record: InputRecord): OrdersReport => {
  const order: OrdersReport = {
    id: record.id,
    vendor: record.vendor,
    date: record.date,
    customer: record.customer.id,
    order: generateOrderReports(record)
  };
  return order;
};

const ordersFromInputRecords = async (records: InputRecord[]): Promise<OrdersReport[]> => 
Promise.resolve(records).then(all => all.map(record => transformInputRecord(record)));

/**
 * Transforms an array of input records to a output report in the format instructed.
 * @param records The array of input records to transform.
 * @returns A outpout report in the format instructed.
 */
export const transformInputRecords = async (records: InputRecord[]): Promise<Report> => {
  const report: Report = {
    customers: records.map((record) => record.customer),
    orders: await ordersFromInputRecords(records)
  };
  return report;
};

