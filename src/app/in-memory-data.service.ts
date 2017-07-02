import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const postcode = [
      {
        id: 0, name: 'NE65DD',
        addresses: [{ line1: '174', line2: 'Rothbury Terrace', line3: '', line4: '', line5: '', postcode: 'NE65DD' },
        { line1: '172', line2: 'Rothbury Terrace', line3: '', line4: '', line5: '', postcode: 'NE65DD' },
        { line1: '171', line2: 'Rothbury Terrace', line3: '', line4: '', line5: '', postcode: 'NE65DD' },
        { line1: '170', line2: 'Rothbury Terrace', line3: '', line4: '', line5: '', postcode: 'NE65DD' }]
      },
      {
        id: 0, name: 'NE270QQ',
        addresses: [{ line1: '20', line2: 'Accenture Way', line3: '', line4: '', line5: '', postcode: 'NE270QQ' },
        { line1: '1', line2: 'Accenture Way', line3: '', line4: '', line5: '', postcode: 'NE270QQ' },
        { line1: '2', line2: 'Accenture Way', line3: '', line4: '', line5: '', postcode: 'NE270QQ' },
        { line1: '15', line2: 'Accenture Way', line3: '', line4: '', line5: '', postcode: 'NE270QQ' }]
      },
      {
        id: 0, name: 'NE10DE',
        addresses: [{ line1: '10', line2: 'Whitefiled Garden', line3: '', line4: '', line5: '', postcode: 'NE10DE' },
        { line1: '12', line2: 'Whitefiled Garden', line3: '', line4: '', line5: '', postcode: 'NE10DE' },
        { line1: '14', line2: 'Whitefiled Garden', line3: '', line4: '', line5: '', postcode: 'NE10DE' },
        { line1: '16', line2: 'Whitefiled Garden', line3: '', line4: '', line5: '', postcode: 'NE10DE' }]
      }
    ];
    return { postcode };
  }
}