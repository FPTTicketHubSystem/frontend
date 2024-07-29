import request from '../utils/request';

export const PaymentForUser = async (data) => {
    try {
      const respone = await request({
        method: 'post',
        url: 'payment/paymentForUser',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      return respone;
    } catch (e) {
      return e;
    }
};
  
export const DeleteTimeOutOrder = async (data) => {
    try {
      const respone = await request({
        method: 'post',
        url: 'payment/deleteTimeOutOrder',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      return respone;
    } catch (e) {
      return e;
    }
};

export const ReturnPaymentUrl = async (data) => {
    try {
        debugger;
        const response = await request({
            method: 'post',
            url: 'payment/returnPaymentUrl',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        return e;
    }
};

export const CheckInputCoupon = async (id , discount) => {
  try {
      debugger;
      const response = await request({
          method: 'post',
          url: `payment/checkInputCoupon?ticketId=${id}&coupon=${discount}`,
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response;
  } catch (e) {
      return e;
  }
};
