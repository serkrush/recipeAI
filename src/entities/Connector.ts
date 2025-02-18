import BaseContext from 'src/BaseContext';
import alias from 'src/decorators/alias';

@alias('Connector')
export default class Connector extends BaseContext {
  constructor(opts: any) {
    super(opts);
  }

}
