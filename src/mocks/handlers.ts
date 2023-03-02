import { rest } from 'msw';
import mocks from './MOCK_DATA.json';

export const handlers = [
  rest.get('/participant', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(mocks));
  }),
  rest.get('/participant/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === 'KFG-723') return res(ctx.status(200), ctx.json([mocks[0]]));
    if (id === 'KFG-724') return res(ctx.status(200), ctx.json([mocks[1]]));
    if (id === 'KFG-725') return res(ctx.status(200), ctx.json([mocks[2]]));
    if (id === 'KFG-726') return res(ctx.status(200), ctx.json([mocks[3]]));
    return res(ctx.status(200), ctx.json([]));
  }),
];
