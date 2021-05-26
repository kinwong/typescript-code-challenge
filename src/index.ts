/* eslint-disable no-console */
import { read, transformInputRecords, write } from './transforming';

const inputPathName = './data.json';
const outputPathName = './data-transformed.json';

async function main() {
  const input = await read(inputPathName);
  const report = await transformInputRecords(input);
  await write(outputPathName, report);

  console.info(`File "${inputPathName}" is transformed as "${outputPathName}".`);
}

main().catch((err) => console.error(err));
