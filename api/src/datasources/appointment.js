/* eslint-disable no-console */
const { customAlphabet } = require('nanoid');
const { DataSource } = require('apollo-datasource');

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 6);

class AppointmentAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async create(
    {
      concern, medicalHistory, scheduleDate, scheduleTime, requestedUserId,
    },
  ) {
    try {
      const res = await this.store.Appointment.create({
        refCode: nanoid(),
        concern,
        medicalHistory,
        scheduleDate,
        scheduleTime,
        createdBy: this.context.user.id,
        requestedUserId,
      });

      return res.dataValues;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async myAppointments({ page, pageSize = 12 }) {
    try {
      const list = await this.store.Appointment.findAndCountAll({
        where: {
          createdBy: this.context.user.id,
        },
        order: [['createdAt', 'DESC']],
        offset: (page - 1) * pageSize,
        limit: pageSize,
        include: ['requestedUser'],
        nested: true,
      });

      return {
        page,
        pageSize,
        ...list,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(id) {
    try {
      const res = await this.store.Appointment.destroy({
        where: {
          id,
        },
      });

      console.log('res', res);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = AppointmentAPI;
