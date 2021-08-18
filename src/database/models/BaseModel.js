import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Model } = mongoose;
mongoose.plugin(mongoosePaginate);
export default class BaseModel extends Model {
  static queryBuilder(query, populate = []) {
    const { limit, page, orderBy, filter } = query;
    let { fields } = query;
    if (!fields) {
      fields = this.defaultFields;
    }
    return this.paginate(filter, {
      limit,
      page,
      sort: orderBy,
      select: fields,
      populate,
    });
  }
}
