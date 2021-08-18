import Boom from '@hapi/boom';

export default class Service {
  getMany(query) {
    return this.model.queryBuilder(query);
  }

  async getOne(id) {
    const model = await this.model.findById(id);
    if (!model) {
      throw Boom.notFound(`NOT_FOUND`);
    }
    return model;
  }

  createOne(payload) {
    return this.model.create(payload);
  }

  updateOne(id, payload) {
    return this.model.findByIdAndUpdate(id, payload, { new: true });
  }

  async deleteOne(id) {
    await this.model.findByIdAndDelete(id);
    return { success: true };
  }

  async deleteMultiple(ids) {
    await this.model.deleteMany({ _id: { $in: ids } });
  }
}
