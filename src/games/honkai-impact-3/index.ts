import { Elysia } from 'elysia';

import { Model } from './model';
import { HonkaiImpact3 } from './service';

import { ResponseError } from '../../utils/model';

export default new Elysia().get('/honkai-impact-3', ({ query: { uid } }) => HonkaiImpact3.check({ uid }), {
  query: Model.query,
  response: {
    200: Model.success,
    400: Model.badRequest,
    404: ResponseError.notFound,
    503: ResponseError.serverError,
  },
  error({ error, code, set }) {
    if (code === 'VALIDATION') {
      set.status = 'Bad Request';

      return {
        success: false,
        errors: error.all.map((e) => ({
          path: e.path,
          message: e.message,
          summary: e.summary,
        })),
      };
    }
  },
  detail: {
    summary: 'Honkai Impact 3',
  },
});
