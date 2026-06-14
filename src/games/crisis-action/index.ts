import { Elysia } from 'elysia';

import { Model } from './model';
import { CrisisAction } from './service';

import { ResponseError } from '../../utils/model';

export default new Elysia().get('/crisis-action', ({ query: { id, server } }) => CrisisAction.check({ id, server }), {
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
    summary: 'Crisis Action',
  },
});
