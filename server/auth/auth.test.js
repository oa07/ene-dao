const request = require('supertest-as-promised');
const chai = require('chai');
const randomize = require('randomatic');
const random = require('random-name');
const app = require('../../index');

const { expect } = chai;
chai.config.includeStack = true;

const authData = {};

const registerDataForCustomer = {
  fullname: `${random.first()} ${random.middle()} ${random.last()}`,
  email: `${random.first() +
    random.middle() +
    random.last()}@student.cse.du.ac.bd`,
  contactNo: `+88${randomize('0', 11)}`,
  password: '12131!@#$%^&*(Aa',
  confirmPassword: '12131!@#$%^&*(Aa',
  location: '450/A Shewrapara, Mirpur, Dhaka - 1216',
  role: 'customer'
};

const registerDataForDeliveryMan = {
  fullname: `${random.first()} ${random.middle()} ${random.last()}`,
  email: `${random.first() +
    random.middle() +
    random.last()}@student.cse.du.ac.bd`,
  contactNo: `+88${randomize('0', 11)}`,
  password: '12131!@#$%^&*(Aa',
  confirmPassword: '12131!@#$%^&*(Aa',
  location: '450/A Shewrapara, Mirpur, Dhaka - 1216',
  role: 'deliveryman'
};

const registerDataForAdmin = {
  fullname: `${random.first()} ${random.middle()} ${random.last()}`,
  email: `${random.first() +
    random.middle() +
    random.last()}@student.cse.du.ac.bd`,
  contactNo: `+88${randomize('0', 11)}`,
  password: '12131!@#$%^&*(Aa',
  confirmPassword: '12131!@#$%^&*(Aa',
  identity: '450/A Shewrapara, Mirpur, Dhaka - 1216'
};

describe('Auth | Register', () => {
  describe('Auth | Register | Customer', () => {
    it('Customer Registration Done', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(registerDataForCustomer)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register | Delivery man', () => {
    it('Delivery man Registration Done', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(registerDataForDeliveryMan)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register | Admin', () => {
    it('Admin Registration Done', done => {
      request(app)
        .post('/api/v1/auth/register/admin')
        .send(registerDataForAdmin)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
});
