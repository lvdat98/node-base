import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Model } = mongoose;
mongoose.plugin(mongoosePaginate);
export default class BaseModel extends Model {
  static QueryBuilder(query, populate = []) {
    const { limit, offset, orderBy, fields } = query;
    return this.paginate(
      {},
      {
        limit,
        offset,
        sort: orderBy,
        select: fields,
        populate,
      }
    );
  }
}
