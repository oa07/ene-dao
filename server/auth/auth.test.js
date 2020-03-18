const request = require('supertest-as-promised');
const chai = require('chai');
const randomize = require('randomatic');
const random = require('random-name');
const app = require('../../index');

const { expect } = chai;
chai.config.includeStack = true;

const registerDataForCustomer = () => {
  return {
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
};

const registerDataForDeliveryMan = () => {
  return {
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
};

const registerDataForAdmin = () => {
  return {
    fullname: `${random.first()} ${random.middle()} ${random.last()}`,
    email: `${random.first() +
      random.middle() +
      random.last()}@student.cse.du.ac.bd`,
    contactNo: `+88${randomize('0', 11)}`,
    password: '12131!@#$%^&*(Aa',
    confirmPassword: '12131!@#$%^&*(Aa',
    identity: '450/A Shewrapara, Mirpur, Dhaka - 1216'
  };
};

const randomRegDataForCustomer = registerDataForCustomer();
const randomRegDataForDeliveryMan = registerDataForDeliveryMan();
const randomRegDataForAdmin = registerDataForAdmin();
const randomRegDataForCustomerFB = {
  ...registerDataForCustomer(),
  facebookID: randomize('0', 11)
};
const randomRegDataForDeliveryManFB = {
  ...registerDataForDeliveryMan(),
  facebookID: randomize('0', 11)
};
const randomRegDataForAdminFB = {
  ...registerDataForAdmin(),
  facebookID: randomize('0', 11)
};
const randomRegDataForCustomerGMAIL = {
  ...registerDataForCustomer(),
  gmailID: randomize('0', 11)
};
const randomRegDataForDeliveryManGMAIL = {
  ...registerDataForDeliveryMan(),
  gmailID: randomize('0', 11)
};
const randomRegDataForAdminGMAIL = {
  ...registerDataForAdmin(),
  gmailID: randomize('0', 11)
};

describe('Auth | Register', () => {
  describe('Auth | Register | Customer', () => {
    it('Customer Registration Done', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(randomRegDataForCustomer)
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
        .send(randomRegDataForDeliveryMan)
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
        .send(randomRegDataForAdmin)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register by FB | Customer', () => {
    it('Customer Registration Done (FB Sign up)', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(randomRegDataForCustomerFB)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register by FB | Delivery man', () => {
    it('Delivery man Registration Done (FB Sign up)', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(randomRegDataForDeliveryManFB)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register by FB| Admin', () => {
    it('Admin Registration Done (FB Sign up)', done => {
      request(app)
        .post('/api/v1/auth/register/admin')
        .send(randomRegDataForAdminFB)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register by Gmail | Customer', () => {
    it('Customer Registration Done (Gmail Sign up)', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(randomRegDataForCustomerGMAIL)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register by Gmail | Delivery man', () => {
    it('Delivery man Registration Done (Gmail Sign up)', done => {
      request(app)
        .post('/api/v1/auth/register/user')
        .send(randomRegDataForDeliveryManGMAIL)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Register by Gmail | Admin', () => {
    it('Admin Registration Done (Gmail Sign up)', done => {
      request(app)
        .post('/api/v1/auth/register/admin')
        .send(randomRegDataForAdminGMAIL)
        .expect(201)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
});

const loginDataForCustomer = () => {
  return {
    email: randomRegDataForCustomer.email,
    password: '12131!@#$%^&*(Aa',
    role: 'USER'
  };
};

const loginDataForDeliveryMan = () => {
  return {
    email: randomRegDataForDeliveryMan.email,
    password: '12131!@#$%^&*(Aa',
    role: 'USER'
  };
};

const loginDataForAdmin = () => {
  return {
    email: randomRegDataForAdmin.email,
    password: '12131!@#$%^&*(Aa',
    role: 'ADMIN'
  };
};

describe('Auth | Login', () => {
  describe('Auth | Login | Customer', () => {
    it('Customer Login Done', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send(loginDataForCustomer())
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Login | Delivery Man', () => {
    it('Delivery Man Login Done', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send(loginDataForDeliveryMan())
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Login | Admin', () => {
    it('Admin Login Done', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send(loginDataForAdmin())
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Login | Customer | FB Sign in', () => {
    it('Customer Login Done (FB)', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          facebookID: randomRegDataForCustomerFB.facebookID,
          role: 'USER'
        })
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });

  describe('Auth | Login | Delivery man | FB Sign in', () => {
    it('Delivery man Login Done (FB)', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          facebookID: randomRegDataForDeliveryManFB.facebookID,
          role: 'USER'
        })
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Login | Admin | FB Sign in', () => {
    it('Admin Login Done (FB)', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          facebookID: randomRegDataForAdminFB.facebookID,
          role: 'ADMIN'
        })
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });

  describe('Auth | Login | Customer | Gmail Login', () => {
    it('Customer Login Done (Gmail)', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          gmailID: randomRegDataForCustomerGMAIL.gmailID,
          role: 'USER'
        })
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Login | Delivery Man | Gmail Login', () => {
    it('Delivery Man Login Done (Gmail)', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          gmailID: randomRegDataForDeliveryManGMAIL.gmailID,
          role: 'USER'
        })
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
  describe('Auth | Login | Admin | Gmail Login', () => {
    it('Admin Login Done (Gmail)', done => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          gmailID: randomRegDataForAdminGMAIL.gmailID,
          role: 'ADMIN'
        })
        .expect(200)
        .then(res => {
          done();
        })
        .catch(done);
    });
  });
});
